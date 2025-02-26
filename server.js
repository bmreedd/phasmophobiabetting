import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ----- Full Question Bank ----- //

// High Risk Questions: 20 entries
const highRiskQuestions = [];
for (let i = 1; i <= 20; i++) {
  if (i === 1) {
    highRiskQuestions.push({
      id: 'H1',
      text: "Will [PLAYER] die within the first 5 minutes? (Max wager 10k)",
      multiplier: 5
    });
  } else {
    highRiskQuestions.push({
      id: `H${i}`,
      text: `High Risk Question ${i}`,
      multiplier: 5
    });
  }
}

// Medium Risk Questions: 40 entries
const mediumRiskQuestions = [];
for (let i = 1; i <= 40; i++) {
  mediumRiskQuestions.push({
    id: `M${i}`,
    text: `Medium Risk Question ${i}`,
    multiplier: 3
  });
}

// Low Risk Questions: 60 entries
const lowRiskQuestions = [];
for (let i = 1; i <= 60; i++) {
  lowRiskQuestions.push({
    id: `L${i}`,
    text: `Low Risk Question ${i}`,
    multiplier: 1.5
  });
}

// ----- Helper Functions ----- //

function getRandomItems(arr, count) {
  let copy = [...arr];
  let result = [];
  for (let i = 0; i < count; i++) {
    if (copy.length === 0) break;
    let index = Math.floor(Math.random() * copy.length);
    result.push(copy[index]);
    copy.splice(index, 1);
  }
  return result;
}

// Start a new round by randomly selecting questions from the full bank.
// Also filters out any questions containing "sanity" (case-insensitive).
function startNewRound(existingPot = 0) {
  const filteredHigh = highRiskQuestions.filter(q => !q.text.toLowerCase().includes("sanity"));
  const filteredMedium = mediumRiskQuestions.filter(q => !q.text.toLowerCase().includes("sanity"));
  const filteredLow = lowRiskQuestions.filter(q => !q.text.toLowerCase().includes("sanity"));
  
  const high = getRandomItems(filteredHigh, 2);
  const medium = getRandomItems(filteredMedium, 3);
  const low = getRandomItems(filteredLow, 4);
  
  currentRound = {
    roundNumber: currentRound ? currentRound.roundNumber + 1 : 1,
    questions: { high, medium, low },
    bets: {},
    pot: Number(existingPot),
    activePlayer: null
  };
  return currentRound;
}

// ----- Data & State ----- //

let players = {}; // { socketId: { username, balance, role, socketId } }
let moderator = null;
let currentRound = null;

// ----- Socket.io Events ----- //

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Registration: data = { username, balance, role }
  socket.on('register', (data) => {
    const { username, balance, role } = data;
    players[socket.id] = { username, balance: Number(balance), role, socketId: socket.id };
    if (role === 'moderator') moderator = socket.id;
    io.emit('playersUpdate', players);
  });

  // Moderator starts a new round
  socket.on('startRound', (existingPot) => {
    if (socket.id === moderator) {
      const round = startNewRound(Number(existingPot) || 0);
      io.emit('newRound', round);
    }
  });

  // Moderator sets the active player (to sit out)
  socket.on('setActivePlayer', (activePlayerId) => {
    if (socket.id === moderator && currentRound) {
      currentRound.activePlayer = activePlayerId;
      io.emit('activePlayerSet', activePlayerId);
    }
  });

  // Player places a bet on a given question
  socket.on('placeBet', (data) => {
    if (!currentRound) return;
    const player = players[socket.id];
    const wager = Number(data.wager);
    // Prevent the active player from betting
    if (currentRound.activePlayer === socket.id) return;
    if (player && wager <= player.balance) {
      player.balance -= wager;
      if (!currentRound.bets[socket.id]) {
        currentRound.bets[socket.id] = [];
      }
      currentRound.bets[socket.id].push({ questionId: data.questionId, wager });
      currentRound.pot += wager;
      io.emit('playersUpdate', players);
      io.emit('roundBetsUpdate', currentRound.bets, currentRound.pot);
    }
  });

  // Moderator ends the round by sending outcomes (object: { questionId: true/false })
  socket.on('endRound', (outcomes) => {
    if (socket.id !== moderator || !currentRound) return;
    let roundStats = { correctBets: {}, incorrectBets: {} };
    for (let sid in currentRound.bets) {
      const bets = currentRound.bets[sid];
      let totalWin = 0;
      bets.forEach(bet => {
        const question = [...highRiskQuestions, ...mediumRiskQuestions, ...lowRiskQuestions]
          .find(q => q.id === bet.questionId);
        if (!question) return;
        const outcome = outcomes[bet.questionId];
        // Prepare stats
        if (!roundStats.correctBets[bet.questionId]) roundStats.correctBets[bet.questionId] = [];
        if (!roundStats.incorrectBets[bet.questionId]) roundStats.incorrectBets[bet.questionId] = [];
        if (outcome === true) {
          const payout = bet.wager * question.multiplier;
          totalWin += payout;
          if (currentRound.pot >= payout) {
            currentRound.pot -= payout;
          } else {
            totalWin += currentRound.pot;
            currentRound.pot = 0;
          }
          roundStats.correctBets[bet.questionId].push({ player: players[sid].username, wager: bet.wager, payout });
        } else {
          roundStats.incorrectBets[bet.questionId].push({ player: players[sid].username, wager: bet.wager });
        }
      });
      if (players[sid]) {
        players[sid].balance += totalWin;
      }
    }
    const results = {
      players,
      pot: currentRound.pot,
      bets: currentRound.bets,
      outcomes,
      roundStats,
      roundNumber: currentRound.roundNumber
    };
    io.emit('roundResults', results);
    currentRound = null;
  });
  
  // Allow client to request a player's name by socket id (for active player display)
  socket.on('getPlayerName', (socketId) => {
    if (players[socketId]) {
      socket.emit('activePlayerName', players[socketId]);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    delete players[socket.id];
    io.emit('playersUpdate', players);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

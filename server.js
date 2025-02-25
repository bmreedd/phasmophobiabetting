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

// Data structures
let players = {}; // keyed by socket.id: { username, balance, role, socketId }
let moderator = null;
let currentRound = null; // holds current round data

// Sample question pools (expand these arrays as needed)
const highRiskQuestions = [
  { id: 'H1', text: "Will the player die within the first 5 minutes?", multiplier: 5 },
  { id: 'H2', text: "Will the player survive with less than 10% sanity?", multiplier: 8 }
];
const mediumRiskQuestions = [
  { id: 'M1', text: "Will the first ghost event be a light flicker?", multiplier: 3 },
  { id: 'M2', text: "Will the player burn a smudge stick before it's needed?", multiplier: 3 }
];
const lowRiskQuestions = [
  { id: 'L1', text: "Will the player forget the house keys?", multiplier: 1.5 },
  { id: 'L2', text: "Will the player check the truck twice before entering?", multiplier: 2 }
];

// Utility: Randomly select a number of items from an array
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

// Start a new round by randomly selecting questions
function startNewRound(existingPot = 0) {
  const high = getRandomItems(highRiskQuestions, 2);
  const medium = getRandomItems(mediumRiskQuestions, 3);
  const low = getRandomItems(lowRiskQuestions, 4);
  currentRound = {
    roundNumber: currentRound ? currentRound.roundNumber + 1 : 1,
    questions: { high, medium, low },
    bets: {}, // structure: bets[socketId] = array of { questionId, wager }
    pot: existingPot
  };
  return currentRound;
}

// Socket.io event handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Registration: data = { username, balance, role }
  socket.on('register', (data) => {
    const { username, balance, role } = data;
    players[socket.id] = { username, balance: Number(balance), role, socketId: socket.id };
    if (role === 'moderator') moderator = socket.id;
    io.emit('playersUpdate', players);
  });

  // Moderator starts a new round (optionally with an existing pot amount)
  socket.on('startRound', (existingPot) => {
    if (socket.id === moderator) {
      const round = startNewRound(Number(existingPot) || 0);
      io.emit('newRound', round);
    }
  });

  // Player places a bet on a given question ID
  // data = { questionId, wager }
  socket.on('placeBet', (data) => {
    if (!currentRound) return;
    const player = players[socket.id];
    const wager = Number(data.wager);
    if (player && wager <= player.balance) {
      player.balance -= wager;
      if (!currentRound.bets[socket.id]) {
        currentRound.bets[socket.id] = [];
      }
      currentRound.bets[socket.id].push({ questionId: data.questionId, wager });
      // Increase the pot with the wager amount (lost bets later feed the pot)
      currentRound.pot += wager;
      io.emit('playersUpdate', players);
      io.emit('roundBetsUpdate', currentRound.bets, currentRound.pot);
    }
  });

  // Moderator ends the round by providing outcomes for each question
  // outcomes: { "H1": true, "M1": false, ... }
  socket.on('endRound', (outcomes) => {
    if (socket.id !== moderator || !currentRound) return;
    // Process each player's bets
    for (let sid in currentRound.bets) {
      const bets = currentRound.bets[sid];
      let totalWin = 0;
      bets.forEach(bet => {
        // Find the question details by ID (search all pools)
        const question = [...highRiskQuestions, ...mediumRiskQuestions, ...lowRiskQuestions]
          .find(q => q.id === bet.questionId);
        if (!question) return;
        const outcome = outcomes[bet.questionId];
        if (outcome === true) {
          // Winning bet: payout is wager multiplied by question's multiplier
          const payout = bet.wager * question.multiplier;
          totalWin += payout;
          // Deduct payout from the pot if possible; otherwise, pay what remains
          if (currentRound.pot >= payout) {
            currentRound.pot -= payout;
          } else {
            totalWin += currentRound.pot;
            currentRound.pot = 0;
          }
        }
        // Losing bets already contributed to the pot
      });
      if (players[sid]) {
        players[sid].balance += totalWin;
      }
    }
    io.emit('roundResults', { players, pot: currentRound.pot, bets: currentRound.bets, outcomes });
    // Clear round data after processing
    currentRound = null;
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

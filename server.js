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

/* 
  FULL QUESTION BANK 
  - 20 High-Risk questions (with explicit text)
  - 40 Medium-Risk questions
  - 60 Low-Risk questions
*/

// High Risk Questions
const highRiskQuestions = [
  {
    id: 'H1',
    text: "Will the player die within the first 5 minutes? (Max wager 10k)",
    multiplier: 5
  },
  {
    id: 'H2',
    text: "Will the player get caught during their first ghost hunt?",
    multiplier: 5
  },
  {
    id: 'H3',
    text: "Will the player fail to find any evidence before the initial hunt?",
    multiplier: 5
  },
  {
    id: 'H4',
    text: "Will the player run out of flashlight battery during a hunt?",
    multiplier: 5
  },
  {
    id: 'H5',
    text: "Will the player misuse a crucifix at a critical moment?",
    multiplier: 5
  },
  {
    id: 'H6',
    text: "Will the player accidentally drop vital equipment during an investigation?",
    multiplier: 5
  },
  {
    id: 'H7',
    text: "Will the player ignore an essential objective and face fatal consequences?",
    multiplier: 5
  },
  {
    id: 'H8',
    text: "Will the player be overwhelmed by ghost activity within the first 3 minutes?",
    multiplier: 5
  },
  {
    id: 'H9',
    text: "Will the player mistakenly enter a room known for triggering ghost aggression?",
    multiplier: 5
  },
  {
    id: 'H10',
    text: "Will the player trigger a ghost hunt by disturbing a cursed object?",
    multiplier: 5
  },
  {
    id: 'H11',
    text: "Will the player be unable to escape during a ghost hunt?",
    multiplier: 5
  },
  {
    id: 'H12',
    text: "Will the player face a surge of paranormal activity leading to their demise?",
    multiplier: 5
  },
  {
    id: 'H13',
    text: "Will the player suffer a fatal mishap while collecting evidence?",
    multiplier: 5
  },
  {
    id: 'H14',
    text: "Will the player accidentally sever communications in a dangerous situation?",
    multiplier: 5
  },
  {
    id: 'H15',
    text: "Will the player use a smudge stick at the wrong time and fail to prevent a hunt?",
    multiplier: 5
  },
  {
    id: 'H16',
    text: "Will the player be directly targeted by the ghost immediately after a trigger?",
    multiplier: 5
  },
  {
    id: 'H17',
    text: "Will the player's chosen strategy backfire catastrophically at a critical moment?",
    multiplier: 5
  },
  {
    id: 'H18',
    text: "Will the player misinterpret ghost signals and fall into a deadly trap?",
    multiplier: 5
  },
  {
    id: 'H19',
    text: "Will the player make an impulsive decision that leads to a fatal outcome?",
    multiplier: 5
  },
  {
    id: 'H20',
    text: "Will the player's equipment malfunction at the worst possible moment?",
    multiplier: 5
  }
];

// Medium Risk Questions (40)
const mediumRiskQuestions = [];
for (let i = 1; i <= 40; i++) {
  mediumRiskQuestions.push({
    id: `M${i}`,
    text: (() => {
      // Each question is written out explicitly.
      switch(i) {
        case 1: return "Will the first ghost event be a sudden light flicker?";
        case 2: return "Will the player burn a smudge stick before it's needed?";
        case 3: return "Will the player accidentally trigger a ghost event by making noise?";
        case 4: return "Will the player misidentify a crucial piece of evidence?";
        case 5: return "Will the player leave an important tool behind?";
        case 6: return "Will the player spend too much time checking a supposedly safe room?";
        case 7: return "Will the player take a wrong turn and get lost in the building?";
        case 8: return "Will the player fail to complete an objective due to panic?";
        case 9: return "Will the player overuse battery power on unnecessary equipment?";
        case 10: return "Will the player trigger a minor ghost event by accident?";
        case 11: return "Will the player receive misleading readings from their equipment?";
        case 12: return "Will the player ignore a crucial clue during the investigation?";
        case 13: return "Will the player hesitate too long when confronting paranormal activity?";
        case 14: return "Will the player experience a communication breakdown with their gear?";
        case 15: return "Will the player be distracted by a false positive ghost event?";
        case 16: return "Will the player underestimate the ghost’s movement patterns?";
        case 17: return "Will the player misinterpret the ghost’s behavior during an event?";
        case 18: return "Will the player fail to secure an area before a hunt begins?";
        case 19: return "Will the player neglect to update their evidence log in time?";
        case 20: return "Will the player rely too heavily on one piece of equipment?";
        case 21: return "Will the player suffer a minor equipment failure at a critical moment?";
        case 22: return "Will the player forget to check a key location for evidence?";
        case 23: return "Will the player miscalculate the time needed to complete an objective?";
        case 24: return "Will the player get startled by an unexpected sound?";
        case 25: return "Will the player have a brief lapse in judgment during high tension?";
        case 26: return "Will the player momentarily lose focus during a routine check?";
        case 27: return "Will the player make a tactical error in positioning during an event?";
        case 28: return "Will the player overlook a subtle paranormal clue?";
        case 29: return "Will the player be overly cautious and miss an opportunity?";
        case 30: return "Will the player experience an unexpected battery drain issue?";
        case 31: return "Will the player misjudge the distance to a critical objective?";
        case 32: return "Will the player underestimate the ghost's overall activity?";
        case 33: return "Will the player experience a short-term sensory overload?";
        case 34: return "Will the player briefly doubt their investigation strategy?";
        case 35: return "Will the player mistakenly trust unreliable evidence?";
        case 36: return "Will the player choose an incorrect route during a critical moment?";
        case 37: return "Will the player get a false reading on their paranormal device?";
        case 38: return "Will the player be momentarily paralyzed by fear?";
        case 39: return "Will the player fail to notice a subtle change in ghost behavior?";
        case 40: return "Will the player make an error in timing their equipment usage?";
        default: return `Medium Risk Question ${i}`;
      }
    })(),
    multiplier: 3
  });
}

// Low Risk Questions (60)
const lowRiskQuestions = [];
for (let i = 1; i <= 60; i++) {
  lowRiskQuestions.push({
    id: `L${i}`,
    text: (() => {
      switch(i) {
        case 1: return "Will the player forget the house keys?";
        case 2: return "Will the player check the truck twice before entering the house?";
        case 3: return "Will the player leave the flashlight behind?";
        case 4: return "Will the player misplace a battery pack?";
        case 5: return "Will the player forget to pick up an important piece of evidence?";
        case 6: return "Will the player take an unnecessary detour during the investigation?";
        case 7: return "Will the player accidentally trigger a minor noise event?";
        case 8: return "Will the player leave a door open unintentionally?";
        case 9: return "Will the player forget to reset a crucial equipment setting?";
        case 10: return "Will the player miss an obvious clue in the environment?";
        case 11: return "Will the player double-check an area they already inspected?";
        case 12: return "Will the player be momentarily distracted by background sounds?";
        case 13: return "Will the player stumble over a loose floorboard?";
        case 14: return "Will the player inadvertently leave a window open?";
        case 15: return "Will the player lose track of time during their investigation?";
        case 16: return "Will the player skip over a mundane but important task?";
        case 17: return "Will the player ignore a subtle environmental change?";
        case 18: return "Will the player forget to check the map at a crucial moment?";
        case 19: return "Will the player be too hesitant to approach a suspicious area?";
        case 20: return "Will the player misjudge the position of a common object?";
        case 21: return "Will the player take a detour that wastes valuable time?";
        case 22: return "Will the player overlook a routine detail in their search?";
        case 23: return "Will the player experience a minor lapse in attention?";
        case 24: return "Will the player be momentarily disoriented in a familiar area?";
        case 25: return "Will the player accidentally trigger a small alarm?";
        case 26: return "Will the player forget to document a simple observation?";
        case 27: return "Will the player pause too long before proceeding with an objective?";
        case 28: return "Will the player leave a light on when it's not needed?";
        case 29: return "Will the player misplace a non-critical piece of equipment?";
        case 30: return "Will the player experience a brief moment of clumsiness?";
        case 31: return "Will the player take an unnecessarily long pause during routine checks?";
        case 32: return "Will the player overlook a standard inspection step?";
        case 33: return "Will the player lose focus on a simple task momentarily?";
        case 34: return "Will the player be slightly delayed arriving at a key location?";
        case 35: return "Will the player overprepare and cause a minor delay?";
        case 36: return "Will the player miss a routine step in their process?";
        case 37: return "Will the player suffer a brief memory lapse about an objective?";
        case 38: return "Will the player unknowingly repeat a non-essential action?";
        case 39: return "Will the player overthink a trivial detail?";
        case 40: return "Will the player experience a short delay in equipment setup?";
        case 41: return "Will the player overlook a minor environmental cue?";
        case 42: return "Will the player make a small mistake while checking their gear?";
        case 43: return "Will the player hesitate briefly before moving on?";
        case 44: return "Will the player repeat a standard procedure unnecessarily?";
        case 45: return "Will the player question an obvious clue for a moment?";
        case 46: return "Will the player experience a slight delay in decision making?";
        case 47: return "Will the player misinterpret a minor signal from equipment?";
        case 48: return "Will the player make a timing error in a simple task?";
        case 49: return "Will the player be distracted by an unimportant detail?";
        case 50: return "Will the player overlook a minor instruction during routine checks?";
        case 51: return "Will the player react a tad too slowly to an event?";
        case 52: return "Will the player miss a non-critical environmental signal?";
        case 53: return "Will the player experience a brief moment of uncertainty?";
        case 54: return "Will the player make a minor error during a simple inspection?";
        case 55: return "Will the player falter momentarily on a basic task?";
        case 56: return "Will the player execute a routine step slightly off schedule?";
        case 57: return "Will the player fail to notice a small environmental change?";
        case 58: return "Will the player have a short lapse in routine vigilance?";
        case 59: return "Will the player take a little extra time on an ordinary procedure?";
        case 60: return "Will the player forget a standard detail during a routine round?";
        default: return `Low Risk Question ${i}`;
      }
    })(),
    multiplier: 1.5
  });
}

// ----- Helper Function: Start New Round ----- //

let currentRound = null;
let players = {}; // { socketId: { username, balance, role, socketId } }
let moderator = null;

function startNewRound(existingPot = 0) {
  // Filter out sanity-related questions
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

  // Player places a bet on a given question (chosen from dropdown)
  socket.on('placeBet', (data) => {
    if (!currentRound) return;
    const player = players[socket.id];
    const wager = Number(data.wager);
    // Prevent active player from betting
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

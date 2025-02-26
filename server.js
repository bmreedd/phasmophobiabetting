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
  FULL QUESTION BANK:
  - 20 High-Risk questions (with explicit text and multipliers shown)
  - 40 Medium-Risk questions (fully written out)
  - 60 Low-Risk questions (fully written out)
*/

// High Risk Questions (20)
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
  let text;
  switch(i) {
    case 1: text = "Will the first ghost event be a sudden light flicker?"; break;
    case 2: text = "Will the player burn a smudge stick before it's needed?"; break;
    case 3: text = "Will the player accidentally trigger a ghost event by making noise?"; break;
    case 4: text = "Will the player misidentify a crucial piece of evidence?"; break;
    case 5: text = "Will the player leave an important tool behind?"; break;
    case 6: text = "Will the player spend too much time checking a supposedly safe room?"; break;
    case 7: text = "Will the player take a wrong turn and get lost in the building?"; break;
    case 8: text = "Will the player fail to complete an objective due to panic?"; break;
    case 9: text = "Will the player overuse battery power on unnecessary equipment?"; break;
    case 10: text = "Will the player trigger a minor ghost event by accident?"; break;
    case 11: text = "Will the player receive misleading readings from their equipment?"; break;
    case 12: text = "Will the player ignore a crucial clue during the investigation?"; break;
    case 13: text = "Will the player hesitate too long when confronting paranormal activity?"; break;
    case 14: text = "Will the player experience a communication breakdown with their gear?"; break;
    case 15: text = "Will the player be distracted by a false positive ghost event?"; break;
    case 16: text = "Will the player underestimate the ghost’s movement patterns?"; break;
    case 17: text = "Will the player misinterpret the ghost’s behavior during an event?"; break;
    case 18: text = "Will the player fail to secure an area before a hunt begins?"; break;
    case 19: text = "Will the player neglect to update their evidence log in time?"; break;
    case 20: text = "Will the player rely too heavily on one piece of equipment?"; break;
    case 21: text = "Will the player suffer a minor equipment failure at a critical moment?"; break;
    case 22: text = "Will the player forget to check a key location for evidence?"; break;
    case 23: text = "Will the player miscalculate the time needed to complete an objective?"; break;
    case 24: text = "Will the player get startled by an unexpected sound?"; break;
    case 25: text = "Will the player have a brief lapse in judgment during high tension?"; break;
    case 26: text = "Will the player momentarily lose focus during a routine check?"; break;
    case 27: text = "Will the player make a tactical error in positioning during an event?"; break;
    case 28: text = "Will the player overlook a subtle paranormal clue?"; break;
    case 29: text = "Will the player be overly cautious and miss an opportunity?"; break;
    case 30: text = "Will the player experience an unexpected battery drain issue?"; break;
    case 31: text = "Will the player misjudge the distance to a critical objective?"; break;
    case 32: text = "Will the player underestimate the ghost's overall activity?"; break;
    case 33: text = "Will the player experience a short-term sensory overload?"; break;
    case 34: text = "Will the player briefly doubt their investigation strategy?"; break;
    case 35: text = "Will the player mistakenly trust unreliable evidence?"; break;
    case 36: text = "Will the player choose an incorrect route during a critical moment?"; break;
    case 37: text = "Will the player get a false reading on their paranormal device?"; break;
    case 38: text = "Will the player be momentarily paralyzed by fear?"; break;
    case 39: text = "Will the player fail to notice a subtle change in ghost behavior?"; break;
    case 40: text = "Will the player make an error in timing their equipment usage?"; break;
    default: text = `Medium Risk Question ${i}`;
  }
  mediumRiskQuestions.push({ id: `M${i}`, text, multiplier: 3 });
}

// Low Risk Questions (60)
const lowRiskQuestions = [];
for (let i = 1; i <= 60; i++) {
  let text;
  switch(i) {
    case 1: text = "Will the player forget the house keys?"; break;
    case 2: text = "Will the player check the truck twice before entering the house?"; break;
    case 3: text = "Will the player leave the flashlight behind?"; break;
    case 4: text = "Will the player misplace a battery pack?"; break;
    case 5: text = "Will the player forget to pick up an important piece of evidence?"; break;
    case 6: text = "Will the player take an unnecessary detour during the investigation?"; break;
    case 7: text = "Will the player accidentally trigger a minor noise event?"; break;
    case 8: text = "Will the player leave a door open unintentionally?"; break;
    case 9: text = "Will the player forget to reset a crucial equipment setting?"; break;
    case 10: text = "Will the player miss an obvious clue in the environment?"; break;
    case 11: text = "Will the player double-check an area they already inspected?"; break;
    case 12: text = "Will the player be momentarily distracted by background sounds?"; break;
    case 13: text = "Will the player stumble over a loose floorboard?"; break;
    case 14: text = "Will the player inadvertently leave a window open?"; break;
    case 15: text = "Will the player lose track of time during their investigation?"; break;
    case 16: text = "Will the player skip over a mundane but important task?"; break;
    case 17: text = "Will the player ignore a subtle environmental change?"; break;
    case 18: text = "Will the player forget to check the map at a crucial moment?"; break;
    case 19: text = "Will the player be too hesitant to approach a suspicious area?"; break;
    case 20: text = "Will the player misjudge the position of a common object?"; break;
    case 21: text = "Will the player take a detour that wastes valuable time?"; break;
    case 22: text = "Will the player overlook a routine detail in their search?"; break;
    case 23: text = "Will the player experience a minor lapse in attention?"; break;
    case 24: text = "Will the player be momentarily disoriented in a familiar area?"; break;
    case 25: text = "Will the player accidentally trigger a small alarm?"; break;
    case 26: text = "Will the player forget to document a simple observation?"; break;
    case 27: text = "Will the player pause too long before proceeding with an objective?"; break;
    case 28: text = "Will the player leave a light on when it's not needed?"; break;
    case 29: text = "Will the player misplace a non-critical piece of equipment?"; break;
    case 30: text = "Will the player experience a brief moment of clumsiness?"; break;
    case 31: text = "Will the player take an unnecessarily long pause during routine checks?"; break;
    case 32: text = "Will the player overlook a standard inspection step?"; break;
    case 33: text = "Will the player lose focus on a simple task momentarily?"; break;
    case 34: text = "Will the player be slightly delayed arriving at a key location?"; break;
    case 35: text = "Will the player overprepare and cause a minor delay?"; break;
    case 36: text = "Will the player miss a routine step in their process?"; break;
    case 37: text = "Will the player suffer a brief memory lapse about an objective?"; break;
    case 38: text = "Will the player unknowingly repeat a non-essential action?"; break;
    case 39: text = "Will the player overthink a trivial detail?"; break;
    case 40: text = "Will the player experience a short delay in equipment setup?"; break;
    case 41: text = "Will the player overlook a minor environmental cue?"; break;
    case 42: text = "Will the player make a small mistake while checking their gear?"; break;
    case 43: text = "Will the player hesitate briefly before moving on?"; break;
    case 44: text = "Will the player repeat a standard procedure unnecessarily?"; break;
    case 45: text = "Will the player question an obvious clue for a moment?"; break;
    case 46: text = "Will the player experience a slight delay in decision making?"; break;
    case 47: text = "Will the player misinterpret a minor signal from equipment?"; break;
    case 48: text = "Will the player make a timing error in a simple task?"; break;
    case 49: text = "Will the player be distracted by an unimportant detail?"; break;
    case 50: text = "Will the player overlook a minor instruction during routine checks?"; break;
    case 51: text = "Will the player react a tad too slowly to an event?"; break;
    case 52: text = "Will the player miss a non-critical environmental signal?"; break;
    case 53: text = "Will the player experience a brief moment of uncertainty?"; break;
    case 54: text = "Will the player make a minor error during a simple inspection?"; break;
    case 55: text = "Will the player falter momentarily on a basic task?"; break;
    case 56: text = "Will the player execute a routine step slightly off schedule?"; break;
    case 57: text = "Will the player fail to notice a small environmental change?"; break;
    case 58: text = "Will the player have a short lapse in routine vigilance?"; break;
    case 59: text = "Will the player take a little extra time on an ordinary procedure?"; break;
    case 60: text = "Will the player forget a standard detail during a routine round?"; break;
    default: text = `Low Risk Question ${i}`;
  }
  lowRiskQuestions.push({ id: `L${i}`, text, multiplier: 1.5 });
}

// ----- Helper Function: Start New Round ----- //

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

let currentRound = null;
let players = {}; // { socketId: { username, balance, role, socketId } }
let moderator = null;

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

  // Moderator starts a new round (allowing rounds even if there are no other players)
  socket.on('startRound', (existingPot) => {
    if (socket.id === moderator) {
      const round = startNewRound(Number(existingPot) || 0);
      io.emit('newRound', round);
    }
  });

  // Moderator sets the active player (to sit out)
  socket.on('setActivePlayer', (activePlayerId) => {
    if (socket.id === moderator && currentRound) {
      // Allow null or empty activePlayerId if no other players exist
      currentRound.activePlayer = activePlayerId || null;
      io.emit('activePlayerSet', currentRound.activePlayer);
    }
  });

  // Player places a bet on a given question (selected from dropdown)
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

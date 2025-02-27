import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { Client } from 'pg';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Setup PostgreSQL Client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

// Database models
const Player = {
  create: async (username) => {
    const query = 'INSERT INTO players (id, username, balance) VALUES ($1, $2, $3) RETURNING *';
    const result = await client.query(query, [uuidv4(), username, 100]);
    return result.rows[0];
  },
  getByUsername: async (username) => {
    const query = 'SELECT * FROM players WHERE username = $1';
    const result = await client.query(query, [username]);
    return result.rows[0];
  },
  updateBalance: async (id, balance) => {
    const query = 'UPDATE players SET balance = $1 WHERE id = $2 RETURNING *';
    const result = await client.query(query, [balance, id]);
    return result.rows[0];
  }
};

let currentRound = null;
let pot = 0;
let bets = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Register a player
  socket.on('register', async (username) => {
    let player = await Player.getByUsername(username);
    if (!player) {
      player = await Player.create(username);
    }
    socket.emit('welcome', player);
    io.emit('updateLeaderboard', await Player.getAll());
  });

  // Start a round
  socket.on('startRound', () => {
    currentRound = {
      roundId: uuidv4(),
      questions: getQuestionsForRound(), // Generate questions for the round
    };
    io.emit('roundStarted', currentRound);
  });

  // Place a bet
  socket.on('placeBet', async (username, questionId, wager) => {
    const player = await Player.getByUsername(username);
    if (player.balance < wager) {
      socket.emit('error', 'Insufficient funds');
      return;
    }

    player.balance -= wager;
    bets[username] = { questionId, wager };
    pot += wager;

    await Player.updateBalance(player.id, player.balance);
    io.emit('updatePot', pot);
    io.emit('updateLeaderboard', await Player.getAll());
  });

  // End the round and process bets
  socket.on('endRound', (results) => {
    const winners = [];
    let totalPayout = 0;
    Object.keys(bets).forEach(async (playerId) => {
      const bet = bets[playerId];
      if (results[bet.questionId] === true) {
        totalPayout += bet.wager * 2;
        winners.push(playerId);
      }
    });

    if (pot === 0) {
      winners.forEach((winner) => {
        io.emit('winner', `${winner} wins from the pot`);
      });
    }
  });
});

// Utility Functions (for questions)
const getQuestionsForRound = () => {
  // Use a pool of questions for low, medium, and high risk questions.
  return [
    { id: 'Q1', text: 'Will the ghost hunt within the first 5 minutes?' },
    { id: 'Q2', text: 'Will the ghost interact with the spirit box?' },
    { id: 'Q3', text: 'Will the player attempt to loop the ghost and fail?' },
    { id: 'Q4', text: 'Will the breaker be flipped during the hunt?' },
  ];
};

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

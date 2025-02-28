const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = {};
let pot = 0;
let questions = [
  { id: 'q1', text: 'Will the ghost hunt within 5 minutes?' },
  { id: 'q2', text: 'Will the player use a cursed object?' },
  { id: 'q3', text: 'Will the ghost be in the starting room?' },
  { id: 'q4', text: 'Will the player complete all objectives?' },
];

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  socket.on('register', (username) => {
    players[username] = { socketId: socket.id, balance: 100 };
    io.emit('updatePlayers', players);
    socket.emit('updateQuestions', questions);
  });

  socket.on('placeBet', (data) => {
    const { username, betAmount, selectedQuestion } = data;
    const player = players[username];

    if (player && betAmount <= player.balance) {
      player.balance -= betAmount;
      pot += betAmount;
      io.emit('updatePot', pot);
    }
  });

  socket.on('startNextRound', () => {
    io.emit('roundResults', [
      { username: 'Player1', outcome: 'Won' },
      { username: 'Player2', outcome: 'Lost' },
    ]);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected: ' + socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

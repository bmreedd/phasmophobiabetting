const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Use process.env.PORT for dynamic port binding in production
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  socket.on('register', (username) => {
    console.log(`User ${username} registered`);
    // More logic here to add the user and manage the game...
  });

  socket.on('placeBet', (data) => {
    // Handle bet placement...
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected: ' + socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

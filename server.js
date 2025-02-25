import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


let players = {};
let currentBets = {};
let currentStep = 'waiting';
let totalPot = 0;
let moderator = null;

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    socket.on('register', (username) => {
        if (!players[username]) {
            players[username] = { balance: 100, bet: null };
        }
        io.emit('updatePlayers', players);
    });

    socket.on('startGame', (existingPot) => {
        if (moderator === null) {
            moderator = socket.id;
            currentStep = 'betting';
            if (existingPot > 0) {
                totalPot = existingPot;
            }
            io.emit('newRound', { currentStep, totalPot });
        }
    });

    socket.on('placeBet', ({ username, amount, choice }) => {
        if (players[username] && amount <= players[username].balance) {
            players[username].balance -= amount;
            currentBets[username] = { amount, choice };
            totalPot += amount;
            io.emit('updateBets', currentBets, totalPot);
        }
    });

    socket.on('endRound', (actualOutcome) => {
        if (socket.id === moderator) {
            let winners = {};
            let losers = {};

            for (let username in currentBets) {
                let bet = currentBets[username];
                if (bet.choice === actualOutcome) {
                    winners[username] = bet.amount * 2;
                    players[username].balance += bet.amount * 2;
                } else {
                    losers[username] = bet.amount;
                }
            }

            io.emit('roundResults', { winners, losers, totalPot, players });

            currentBets = {};
            currentStep = 'waiting';
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

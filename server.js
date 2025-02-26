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
      text: `Hig

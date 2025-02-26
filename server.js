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
        case 21: return "Will the player suffer a minor e

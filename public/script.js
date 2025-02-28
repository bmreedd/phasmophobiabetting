const socket = io();
let username = "";
let balance = 100;

function registerUser() {
  username = document.getElementById('username').value;
  if (username) {
    socket.emit('register', username);
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    document.getElementById('player-name').innerText = username;
  }
}

function submitBet() {
  const betAmount = document.getElementById('bet-amount').value;
  const selectedQuestion = document.getElementById('question-dropdown').value;

  if (betAmount && selectedQuestion) {
    socket.emit('placeBet', { username, betAmount, selectedQuestion });
    document.getElementById('gold-balance').innerText = balance - betAmount;
  }
}

function nextRound() {
  socket.emit('startNextRound');
}

socket.on('updateQuestions', (questions) => {
  const dropdown = document.getElementById('question-dropdown');
  dropdown.innerHTML = '';
  questions.forEach(question => {
    const option = document.createElement('option');
    option.value = question.id;
    option.text = question.text;
    dropdown.appendChild(option);
  });
});

socket.on('roundResults', (results) => {
  document.getElementById('round-results').classList.remove('hidden');
  let summary = '';
  results.forEach(result => {
    summary += `<p>${result.username} ${result.outcome}</p>`;
  });
  document.getElementById('results-summary').innerHTML = summary;
});

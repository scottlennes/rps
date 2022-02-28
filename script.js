function randomInt(max = 1) {
    return Math.floor(Math.random() * (max + 1));
}

function computerPlay() {
    let index = randomInt(2);
    const moves = ["rock", "paper", "scissors"];
    return moves[index];
}

function playRound(playerOne, playerTwo) {
    let winner;

    if (playerOne == playerTwo) {
        winner = 0;
    } else if (playerOne == "rock" && playerTwo == "paper") {
        winner = 2;
    } else if (playerOne == "rock" && playerTwo == "scissors") {
        winner = 1;
    } else if (playerOne == "paper" && playerTwo == "rock") {
        winner = 1;
    } else if (playerOne == "paper" && playerTwo == "scissors") {
        winner = 2;
    } else if (playerOne == "scissors" && playerTwo == "rock") {
        winner = 2;
    } else if (playerOne == "scissors" && playerTwo == "paper") {
        winner = 1;
    } else {
        console.log("Hm, this outcome isn't recognized...");
        return;
    }

    let message = new Array(3);

    message[0] = `Player 1 plays ${playerOne}.`;
    message[1] = `Player 2 plays ${playerTwo}.`;

    if (winner == 0) {
        message[2] = "It's a tie.";
    } else {
        message[2] = `Player ${winner} wins the round.`;
    }

    roundResultDesc.textContent = message.join(" ");

    return winner;
}

function processChoice(playerSelection) {
    // Determine round winner
    computerSelection = computerPlay();
    winner = playRound(playerSelection, computerSelection);
    
    // Update scoreboard
    scores[winner]++;
    score1.textContent = scores[1];
    score2.textContent = scores[2];

    // Check for match winner
    if(!isWinner) {
        if(scores[1] >= 3) processWinner(1);
        if(scores[2] >= 3) processWinner(2);
    }
}

function resetGame() {
    // Reset scores to 0
    scores = Array(3).fill(0);
    score1.textContent = scores[1];
    score2.textContent = scores[2];
    isWinner = false;

    // Remove round and match display
    matchResultDisplay.removeChild(resetButton);
    matchResultDesc.textContent = '';
    roundResultDesc.textContent = '';
}

function processWinner(winner) {
    matchResultDesc.textContent = `Player ${winner} wins the match!`;
    isWinner = true;

    // Create reset button
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start over?';
    resetButton.id = 'resetButton';
    matchResultDisplay.appendChild(resetButton);
    resetButton.addEventListener('click', () => {
        resetGame();
    })

}

const choiceButtons = document.querySelectorAll('.choice');
const roundResultDesc = document.querySelector('#roundResult');
const matchResultDisplay = document.querySelector('#matchResult');
const matchResultDesc = document.querySelector('#matchResult .desc');
const score1 = document.querySelector('#score1');
const score2 = document.querySelector('#score2');

let scores = Array(3).fill(0);
let playerSelection;
let computerSelection;
let isWinner = false;

choiceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    processChoice(button.id);
  });
});
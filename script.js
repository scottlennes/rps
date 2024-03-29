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

    message[0] = `${player1} plays ${playerOne}.`;
    message[1] = `Computer plays ${playerTwo}.`;

    if (winner == 0) {
        message[2] = "It's a tie.";
    } else {
        if(winner == 1) {
            message[2] = `${player1} wins the round.`;
        } else {
            message[2] = `Computer wins the round.`;
        }
        
    }

    // document.createElement
    roundResultDesc.innerHTML = roundResultDesc.innerHTML + "<br>" + message.join(" ");

    return winner;
}

function processChoice(playerSelection, roundsToWin) {
    // Determine round winner
    let computerSelection = computerPlay();
    let winner = playRound(playerSelection, computerSelection);
    
    // Update scoreboard
    scores[winner]++;
    score1.textContent = scores[1];
    score2.textContent = scores[2];

    // Check for match winner
    if(!isWinner) {
        if(scores[1] >= roundsToWin) processWinner(1);
        if(scores[2] >= roundsToWin) processWinner(2);
    }
}

function processWinner(winner) {
    if(winner == 1) {
        matchResultDesc.textContent = `${player1} wins the match!`;
    } else {
        matchResultDesc.textContent = `Computer wins the match!`;
    }
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

const preGameDisplay = document.querySelector('#pre-game');
const roundChoiceButtons = document.querySelectorAll('.round-choice');
const nameInput = document.querySelector('#player-name');
const startGameButton = document.querySelector('#start-game');

const gameDisplay = document.querySelector('#game');
const parametersDesc = document.querySelector('#parameters');
const choiceButtons = document.querySelectorAll('.choice');
const roundResultDesc = document.querySelector('#roundResult');
const matchResultDisplay = document.querySelector('#matchResult');
const matchResultDesc = document.querySelector('#matchResult .desc');
const playerName = document.querySelector('#player1')
const score1 = document.querySelector('#score1');
const score2 = document.querySelector('#score2');

let scores = Array(3).fill(0);
let playerSelection;
let roundsToWin = 3;
let isWinner = false;
let player1 = 'Player';

roundChoiceButtons.forEach((button) => {
    if(roundsToWin == button.id) button.classList.add('selected')
});

roundChoiceButtons.forEach((button) => {
    button.addEventListener('click', () => {
        roundChoiceButtons.forEach ((b) => {
            b.classList.remove('selected');
        });
        button.classList.add('selected');
        roundsToWin = parseInt(button.id);
        parametersDesc.textContent = "First to " + roundsToWin + " wins!";
    });
});

startGameButton.addEventListener('click', () => {
    gameDisplay.style.display = 'block';
    preGameDisplay.style.display = 'none';
    if(nameInput.value != '') player1 = nameInput.value;
    playerName.textContent = player1;
})

choiceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    processChoice(button.id, roundsToWin);
  });
});
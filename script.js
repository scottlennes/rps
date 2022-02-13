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

    message[0] = `Player 1 plays ${playerOne}`;
    message[1] = `Player 2 plays ${playerTwo}`;

    if (winner == 0) {
        message[2] = "It's a tie.";
    } else {
        message[2] = `Player ${winner} wins the round.`;
    }

    alert(message.join("\n"));

    return winner;
}

function game(rounds = 5) {
    let score = new Array(3).fill(0);
    let computerSelection;
    let playerSelection;

    for (let i = 0; i < rounds; i++) {
        let computerSelection = computerPlay();
        let playerSelection = prompt("Rock, paper, or scissors?");
        winner = playRound(computerSelection, playerSelection);
        score[winner]++;
    }

    if (score[1] > score[2]) {
        console.log("Computer wins!");
    } else if (score[2] > score[1]) {
        console.log("Player wins!");
    } else {
        console.log("It's a tie!");
    }

    return;
}

game();
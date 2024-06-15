const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const turnIndicator = document.getElementById('turnIndicator');
const currentPlayerElement = document.getElementById('currentPlayer');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const resetScoresButton = document.getElementById('resetScores');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer);

    checkForWinner();
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.innerHTML = `Congratulations! Player ${currentPlayer} has won! 🎉`;
        updateScore();
        gameActive = false;
        animateMessage();
        return;
    }

    if (!gameState.includes('')) {
        message.innerHTML = 'Game ended in a draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerElement.className = currentPlayer;
    currentPlayerElement.innerHTML = currentPlayer;
    message.innerHTML = `It's ${currentPlayer}'s turn`;
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    message.innerHTML = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayerElement.className = currentPlayer;
    currentPlayerElement.innerHTML = currentPlayer;
}

function updateScore() {
    if (currentPlayer === 'X') {
        scoreX++;
        scoreXElement.innerHTML = scoreX;
    } else {
        scoreO++;
        scoreOElement.innerHTML = scoreO;
    }
}

function animateMessage() {
    message.style.animation = 'none';
    message.offsetHeight; /* trigger reflow */
    message.style.animation = '';
}

function resetScores() {
    scoreX = 0;
    scoreO = 0;
    scoreXElement.innerHTML = scoreX;
    scoreOElement.innerHTML = scoreO;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
resetScoresButton.addEventListener('click', resetScores);

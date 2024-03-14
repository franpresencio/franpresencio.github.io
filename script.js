const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);

function handleClick(event) {
    if (gameEnded) return;

    const clickedCell = event.target;
    const cellIndex = parseInt(clickedCell.id.split('-')[1]);

    if (board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        
        if (checkWinner()) {
            resultDisplay.textContent = `Player ${currentPlayer} wins!`;
            gameEnded = true;
        } else if (board.every(cell => cell !== '')) {
            resultDisplay.textContent = 'It\'s a draw!';
            gameEnded = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                setTimeout(computerMove, 500); // Delay computer move for better user experience
            }
        }
    }
}

function checkWinner() {
    return winningCombos.some(combo => {
        return combo.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function disableCellClicks() {
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick);
    });
    resultDisplay.textContent = '';
    currentPlayer = 'X';
    gameEnded = false;
}

function computerMove() {
    if (gameEnded) return;

    let emptyCells = [];
    board.forEach((cell, index) => {
        if (cell === '') {
            emptyCells.push(index);
        }
    });

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cellIndex = emptyCells[randomIndex];

    board[cellIndex] = currentPlayer;
    document.getElementById(`cell-${cellIndex}`).textContent = currentPlayer;

    if (checkWinner()) {
        resultDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameEnded = true;
    } else if (board.every(cell => cell !== '')) {
        resultDisplay.textContent = 'It\'s a draw!';
        gameEnded = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result') as HTMLElement;

let currentPlayer = 'X';
let board: string[] = ['', '', '', '', '', '', '', '', ''];

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

function handleClick(event: MouseEvent) {
    const clickedCell = event.target as HTMLElement;
    const cellIndex = parseInt(clickedCell.id.split('-')[1]);

    if (board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        
        if (checkWinner()) {
            resultDisplay.textContent = `Player ${currentPlayer} wins!`;
            cells.forEach(cell => cell.removeEventListener('click', handleClick));
        } else if (board.every(cell => cell !== '')) {
            resultDisplay.textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner(): boolean {
    return winningCombos.some(combo => {
        return combo.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

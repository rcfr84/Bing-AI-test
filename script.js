// Initialize the game board
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameEnded = false;

// Function to handle a player's move
function makeMove(cellIndex) {
  // Check if the game has ended or the cell is already occupied
  if (gameEnded || board[cellIndex] !== '') {
    return;
  }

  // Update the board with the current player's symbol
  board[cellIndex] = currentPlayer;

  // Update the cell on the game display
  document.getElementById(`cell-${cellIndex}`).textContent = currentPlayer;

  // Check if the current player has won
  if (checkWin(currentPlayer)) {
    document.getElementById('result').textContent = `Player ${currentPlayer} wins!`;
    gameEnded = true;
    return;
  }

  // Check if it's a draw (all cells are filled)
  if (board.every(cell => cell !== '')) {
    document.getElementById('result').textContent = "It's a draw!";
    gameEnded = true;
    return;
  }

  // Switch to the next player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  document.getElementById('turn').textContent = `Player ${currentPlayer}'s turn`;
}

// Function to check if a player has won
function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  // Check if any winning combination is satisfied
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === player);
  });
}

// Function to restart the game
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameEnded = false;

  // Clear the board cells on the game display
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
  });

  // Reset the result and turn display
  document.getElementById('result').textContent = '';
  document.getElementById('turn').textContent = `Player ${currentPlayer}'s turn`;
}

// Event listeners for cell clicks
document.querySelectorAll('.cell').forEach((cell, index) => {
  cell.addEventListener('click', () => makeMove(index));
});

// Event listener for the restart button
document.getElementById('restart-btn').addEventListener('click', restartGame);

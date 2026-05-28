const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let movesPlayed = 0;
let gameState = Array(9).fill("");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function createBoard() {
  board.innerHTML = "";

  gameState.forEach((cell, index) => {
    const square = document.createElement("button");
    square.className = "cell";
    square.dataset.index = index;
    square.innerText = cell;
    square.setAttribute("aria-label", `Cell ${index + 1}`);
    square.addEventListener("click", handleMove);
    board.appendChild(square);
  });
}

function handleMove(event) {
  const index = Number(event.target.dataset.index);

  if (!gameActive || gameState[index] !== "") {
    return;
  }

  gameState[index] = currentPlayer;
  event.target.innerText = currentPlayer;
  event.target.classList.add(currentPlayer.toLowerCase());
  movesPlayed++;

  checkWinner();
}

function checkWinner() {
  for (const condition of winConditions) {
    const [a, b, c] = condition;

    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      finishGame(`Player ${currentPlayer} wins 🎉`, condition);
      return;
    }
  }

  if (movesPlayed === 9) {
    finishGame("It's a draw 🤝");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = `Player ${currentPlayer}'s turn`;
}

function finishGame(message, winningCells = []) {
  statusText.innerText = message;
  gameActive = false;

  winningCells.forEach((index) => {
    board.children[index].classList.add("winner");
  });
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  movesPlayed = 0;
  gameState = Array(9).fill("");
  statusText.innerText = "Player X's turn";
  createBoard();
}

createBoard();

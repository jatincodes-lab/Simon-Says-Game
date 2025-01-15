// JavaScript for Simon Says Game

// Game variables
const colors = ["green", "yellow", "red", "blue"];
let gameSeq = []; // Sequence of colors generated by the game
let playerSeq = []; // Sequence of colors entered by the player
let level = 0; // Current level
let gameStart = false; // Flag to check if the game has started
let highestScore = 0; // Track the highest score

// DOM elements
const body = document.querySelector("body");
const h3 = document.querySelector("h3");
const allBtns = document.querySelectorAll(".btn");

// Start the game on keypress
document.addEventListener("keypress", () => {
  if (!gameStart) {
    gameStart = true;
    levelUp();
  }
});

// Start the game on click
document.addEventListener("click", () => {
  if (!gameStart) {
    gameStart = true;
    levelUp();
  }
});

// Flash effect for game-generated button
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

// Flash effect for player-selected button
function playerFlash(btn) {
  btn.classList.add("flashGreen");
  setTimeout(() => btn.classList.remove("flashGreen"), 250);
}

// Move to the next level
function levelUp() {
  playerSeq = []; // Reset player sequence
  level++;
  h3.innerText = `Level ${level}`;

  // Generate random color and update game sequence
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomBtn = document.querySelector(`.${randomColor}`);

  gameSeq.push(randomColor);
  gameFlash(randomBtn);
}

// Handle button click by player
function btnClicked() {
  const btn = this;
  playerSeq.push(btn.id); // Add button ID to player's sequence
  playerFlash(btn);
  check(playerSeq.length - 1); // Validate the player's input
}

// Validate player's input against the game sequence
function check(idx) {
  if (playerSeq[idx] === gameSeq[idx]) {
    // If player's sequence matches so far
    if (playerSeq.length === gameSeq.length) {
      setTimeout(levelUp, 500); // Move to the next level after a delay
    }
  } else {
    // Game over logic
    if (highestScore < level) {
      highestScore = level; // Update highest score
    }
    h3.innerHTML = `Game Over! <b>Your Score: ${level}</b> <br> Highest Score: ${highestScore} <br> Press any key to restart.`;

    body.classList.add("darkRed"); // Flash red background
    setTimeout(() => body.classList.remove("darkRed"), 150);

    reset();
  }
}

// Reset the game
function reset() {
  gameStart = false;
  playerSeq = [];
  level = 0;
  gameSeq = [];
}

// Add event listeners to buttons
allBtns.forEach((btn) => btn.addEventListener("click", btnClicked));

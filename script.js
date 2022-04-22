const btnCheck = document.querySelector(".check");
const btnAgain = document.querySelector(".again");
const closeModal = document.querySelector(".close-modal");

const guessNumber = document.querySelector(".guess");
const secretNumber = document.querySelector(".secret");
const message = document.querySelector(".message");
const score = document.querySelector(".score");
const highScore = document.querySelector(".highscore");
const backgroundWinner = document.querySelector("body");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

let secret = Math.trunc(Math.random() * 20) + 1;
// secretNumber.textContent = secret;
let scoreGame = 10;
let highScoreGame = 0;

const displayMessage = function (msg) {
  message.textContent = msg;
};

const lostPanel = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeLostPanel = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCheck.addEventListener("click", function () {
  let luckyNumber = Number(guessNumber.value);
  // console.log(luckyNumber, typeof luckyNumber);
  // console.log(secret, typeof secret);
  if (!luckyNumber) {
    displayMessage("Pick a number");
  } else if (luckyNumber !== secret) {
    if (luckyNumber < secret) {
      displayMessage("Number is too low");
    } else displayMessage("Number is too high");
    scoreGame--;
    score.textContent = `💯 Score: ${scoreGame}`;
    if (scoreGame < 1) {
      displayMessage("You lost");
      scoreGame = 0;
      score.textContent = `💯 Score: ${scoreGame}`;
      lostPanel();
    }
  } else if (luckyNumber === secret) {
    displayMessage("Number is correct");
    backgroundWinner.classList.add("winner");
    secretNumber.textContent = secret;
    if (scoreGame > highScoreGame) {
      highScoreGame = scoreGame;
      highScore.textContent = `🥇 Highscore: ${highScoreGame}`;
    }
  }
});

btnAgain.addEventListener("click", function () {
  secret = Math.trunc(Math.random() * 20) + 1;
  // secretNumber.textContent = secret;
  secretNumber.textContent = "?";
  displayMessage("Start guessing...");
  scoreGame = 10;
  score.textContent = `💯 Score: ${scoreGame}`;
  guessNumber.value = "";
  backgroundWinner.classList.remove("winner");
});

closeModal.addEventListener("click", function () {
  closeLostPanel();
});

document.addEventListener("click", function (e) {
  if (
    !modal.classList.contains("hidden") &&
    !btnCheck.contains(e.target) &&
    !modal.contains(e.target)
  )
    closeLostPanel();
});

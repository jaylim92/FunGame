"use strict";

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const playBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameSocre = document.querySelector(".game__score");
const popUp = document.querySelector(".pop-up");
const popUpText = document.querySelector(".pop-up__message");
const popUpRefresh = document.querySelector(".pop-up__refresh");

let started = false;
let score = 0;
let timer = undefined;

playBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

field.addEventListener("click", onFieldClick);

popUpRefresh.addEventListener("click", () => {
  startGame();
});

function startGame() {
  initGame();
  showStopButton();
  showTimerAndSoce();
  startGameTimer();
}

function stopGame() {
  stopGameTimer();
  disappearStopBtn();
  showPopUpText("REPLAY?😛");
  popUpReplay();
}

function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function showStopButton() {
  const icon = playBtn.querySelector(".fa-play");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}

function showPopUpText(text) {
  popUpText.innerText = `${text}`;
}

function disappearStopBtn() {
  playBtn.style.visibility = "hidden";
}

function popUpReplay() {
  popUp.classList.remove("pop-up--hide");
}

function showTimerAndSoce() {
  gameTimer.style.visibility = "visible";
  gameSocre.style.visibility = "visible";
}

function initGame() {
  field.innerHTML = "";
  gameSocre.innerText = CARROT_COUNT;
  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("but", BUG_COUNT, "img/bug.png");
}

function onFieldClick() {
  if (!started) {
    return;
  }
  const target = event.target;
  if (target.matches(".carrot")) {
    //다ㅇ근
    target.remove();
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame();
    }
  } else if (target.matches(".bug")) {
    //벌레
    stopGameTimer();
    finishGame(false);
  }
}

function finishGame(win) {
  started = false;
  disappearStopBtn();
  showPopUpText(win ? "You Win!" : "You Lost😛");
}

function updateScoreBoard() {
  gameSocre.innerText = CARROT_COUNT - score;
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

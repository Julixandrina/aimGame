'use strict';
const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const board = document.querySelector('#board');
const COLORS = ['#ff598f', '#fd8a5e', '#B4F8C8', '#01dddd', '#00bfaf', '#4e2a84', '#8e7dbe', '#ffbc42', '#e4c1f9', '#e28413'];
let time = 0;
let score = 0;

const timeEl = document.querySelector('#time');

startBtn.addEventListener('click', event => {
  event.preventDefault();
  screens[0].classList.add('up');
})



timeList.addEventListener('click', event => {
  //делегирование событий
  if(event.target.classList.contains('time-btn')) {
   time = parseInt(event.target.getAttribute('data-time'));
   screens[1].classList.add('up');
   startGame();

  }
})
board.addEventListener('click', event => {
  if(event.target.classList.contains('circle')) {
    score++;
    event.target.remove()
    createRandomCircle();
  }
})
function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if(time === 0) {
    finishedGame();
  } else {
    let current = --time;
  if(current < 10) {
    current = `0${current}`;
  }
  setTime(current);
  }
  
  
}

function setTime(value) {
  timeEl.innerHTML =  `00:${value}`;
}

function finishedGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Ваш счёт <span class="premary">${score}</span>`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10,60);
  //деструктуризация
  const {width,height} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add('circle')
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  const color = getRandomColor()
  circle.style.background = color;
  circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;

  board.append(circle);
}

function getRandomNumber(min,max) {
  return Math.round(Math.random() * (max - min) + min)
}
function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
  }
  

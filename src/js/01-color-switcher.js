function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;
let currentColor = body.backgroundColor;

startBtn.style.marginLeft = '50%';
startBtn.style.marginTop = '20%';
stopBtn.style.opacity = '50%';
stopBtn.setAttribute('disabled', '');
const buttons = document.querySelectorAll('button');

buttons.forEach(element => {
  element.style.padding = '5px 10px';
  element.style.width = '150px';
  element.style.height = '50px';
});

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    const giveRandom = (body.style.backgroundColor = getRandomHexColor());
  }, 1000);
  currentColor = setInterval(() => {
    console.log(`Current color is ${getRandomHexColor()}`);
  }, 1000);
  stopBtn.style.opacity = '100%';
  startBtn.style.opacity = '50%';
  startBtn.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled', '');
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  clearInterval(currentColor);
  console.log(`Process with id ${timerId} has stopped.`);
  startBtn.style.opacity = '100%';
  stopBtn.style.opacity = '50%';
  startBtn.removeAttribute('disabled', '');
  stopBtn.setAttribute('disabled', '');
});

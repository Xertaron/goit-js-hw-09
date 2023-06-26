import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form.form');
form.addEventListener('click', whenPromiseIsCreated);

const hovers = (document.querySelector('button').onmouseover = function () {
  this.style.scale = '1.1';
  this.style.transition = '250ms';
  document.querySelector('button').onmouseout = function () {
    this.style.scale = '1';
  };
});

const completedPromises = {
  position: 'center-bottom',
  timeout: 5000,
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function whenPromiseIsCreated(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;
  let firstDelay = Number(delay.value);
  let delayStep = Number(step.value);
  let inputAmount = Number(amount.value);

  for (let i = 1; i <= inputAmount; i += 1) {
    firstDelay += delayStep;
    createPromise(i, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(
          `Succesful promise ${position} realized in ${delay}ms`,
          completedPromises
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `False promise ${position} realized in ${delay}ms`,
          completedPromises
        );
      });
    event.currentTarget.reset();
  }
}
//

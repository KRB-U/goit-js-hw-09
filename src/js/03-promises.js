import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

const { delay, step, amount } = form.elements;

function createPromise(position, myDelay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res({ position, myDelay });
      } else {
        rej({ position, myDelay });
      }
    }, myDelay);
  });
}

form.addEventListener('submit', evt => {
  evt.preventDefault();
  let userDelay = Number(delay.value);

  for (let i = 1; i <= Number(amount.value); i += 1) {
    createPromise(i, userDelay)
      .then(({ position, myDelay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${myDelay}ms`);
      })
      .catch(({ position, myDelay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${myDelay}ms`);
      });
    userDelay += Number(step.value);
  }
});

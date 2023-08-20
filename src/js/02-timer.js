import { Notify } from 'notiflix/build/notiflix-notify-aio';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let userTimer = null;
let idInterval = null;

const refs = {
  startBtn: document.querySelector('[data-start]'),
  spanDays: document.querySelector('[data-days]'),
  spanHours: document.querySelector('[data-hours]'),
  spanMin: document.querySelector('[data-minutes]'),
  spanSec: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onClickBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onChange(selectedDates) {
    const currentTime = new Date();

    if (selectedDates[0] - currentTime.getTime() > 0) {
      clearTimer();
      clearInterval(idInterval);
      refs.startBtn.disabled = false;
    } else {
      refs.startBtn.disabled = true;
    }
  },
  onClose(selectedDates) {
    const currentTime = new Date();
    if (selectedDates[0] - currentTime.getTime() > 0) {
      userTimer = selectedDates[0];
      Notify.success('Good');
    } else {
      Notify.failure('Please choose a date in the future');
    }
    // console.log(Number(selectedDates[0]));
  },
};

flatpickr('#datetime-picker', options);

function createTimer(timeMs) {
  const { days, hours, minutes, seconds } = convertMs(userTimer - timeMs);
  refs.spanDays.textContent = addLeadingZero(String(days));
  refs.spanHours.textContent = addLeadingZero(String(hours));
  refs.spanMin.textContent = addLeadingZero(String(minutes));
  refs.spanSec.textContent = addLeadingZero(String(seconds));
}
function clearTimer() {
  refs.spanDays.textContent = '00';
  refs.spanHours.textContent = '00';
  refs.spanMin.textContent = '00';
  refs.spanSec.textContent = '00';
}

function onClickBtn() {
  refs.startBtn.disabled = true;
  const dateNow = new Date();
  createTimer(dateNow);
  clearInterval(idInterval);
  idInterval = setInterval(() => {
    const dateNow = new Date();
    if (userTimer - dateNow < 0) {
      clearInterval(idInterval);
      return;
    }

    createTimer(dateNow);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

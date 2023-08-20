const refs = {
  strBtn: document.querySelector('[data-start]'),
  stpBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
// console.dir(refs.strBtn);
refs.strBtn.addEventListener('click', onClickStartBtn);
refs.stpBtn.addEventListener('click', onClickStoptBtn);

let timeId = null;
let randColor = null;
refs.stpBtn.disabled = true;

function onClickStartBtn() {
  refs.strBtn.disabled = true;
  refs.stpBtn.disabled = false;

  timeId = setInterval(() => {
    // console.log('open');
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickStoptBtn() {
  clearInterval(timeId);
  refs.strBtn.disabled = false;
  refs.stpBtn.disabled = true;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

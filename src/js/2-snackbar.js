import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let form = document.querySelector('.form');

form.addEventListener('submit', eve => {
  eve.preventDefault();
  const delay = eve.target.delay.value;
  const state = eve.target.state.value;
  createPromice(state, delay);
  console.log(state);
});

function createPromice(state, delay) {
  let newPromise = new Promise((resolve, reject) => {
    let timerId = setTimeout(() => {
      if (state == 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  newPromise
    .then(value => {
      iziToast.success({ message: `${value}` });
    })
    .catch(error => {
      iziToast.error({ message: `${error}` });
    });
}

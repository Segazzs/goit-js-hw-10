import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetime = document.querySelector('#datetime-picker');
const button = document.querySelector('button');
const value = document.querySelectorAll('.value');

let userSelectedDate;

function addLeadingZero(value) {
  return value < 10 ? '0' + value.toString() : value;
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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    let date = Date.now();

    let valid = userSelectedDate - date;

    if (valid > 0) {
      button.disabled = false;

      button.addEventListener('click', function () {
        let timerId = setInterval(() => {
          valid = valid - 1000;

          let arr = Object.values(convertMs(valid));

          for (let i = 0; i < value.length; i++) {
            value[i].innerHTML = addLeadingZero(arr[i]);
          }

          console.log(valid);
          if (valid <= 1000) {
            clearInterval(timerId);
          }
        }, 1000);

        button.disabled = true;
      });
    } else {
      iziToast.error({ message: 'Please choose a date in the future' });
      button.disabled = true;
    }
  },
};

flatpickr(datetime, options);

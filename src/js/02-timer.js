import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const fields = document.querySelectorAll('.field');
const values = document.querySelectorAll('.value');
const labels = document.querySelectorAll('.label');
const startBtn = document.querySelector('[data-start]');
let countdownInterval;
startBtn.disabled = true; 

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } 

startBtn.disabled = false;
    clearInterval(countdownInterval);
    startTimer();
  },
};

flatpickr('#datetime-picker', options);

function startTimer() {
  const selectedDate = new Date(
    document.querySelector('#datetime-picker').value
  );
  const currentDate = new Date();
  const timeRemaining = selectedDate.getTime() - currentDate.getTime();

  updateTimerDisplay(convertMs(timeRemaining));
  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeRemaining = selectedDate.getTime() - currentTime.getTime();
    updateTimerDisplay(convertMs(timeRemaining));
  }, 100);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimerDisplay(timeObject) {
  const { days, hours, minutes, seconds } = timeObject;
  values[0].textContent = addLeadingZero(days);
  values[1].textContent = addLeadingZero(hours);
  values[2].textContent = addLeadingZero(minutes);
  values[3].textContent = addLeadingZero(seconds);
}



const timerStyles = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '10px',
  padding: '5px 10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  width: '60px',
};

function addStyle(element, style) {
  for (const el in style) {
    element.style[el] = style[el];
  }
}

fields.forEach(field => addStyle(field, timerStyles));
values.forEach(value => addStyle(value, timerStyles));
labels.forEach(label =>
  addStyle(label, { display: 'block', textAlign: 'center' })
);

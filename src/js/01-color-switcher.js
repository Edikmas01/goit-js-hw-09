function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId;

const start = () => {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
};

const stop = () => {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
};

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);

function styleButtons() {
  startButton.style.padding = '10px 20px';
  startButton.style.fontSize = '16px';

  stopButton.style.padding = '10px 20px';
  stopButton.style.fontSize = '16px';

}

function centerButtons() {
    const buttonContainer = document.createElement('div');
  buttonContainer.style.position = 'absolute';
  buttonContainer.style.top = '50%';
  buttonContainer.style.left = '50%';
  buttonContainer.style.transform = 'translate(-50%, -50%)';


  buttonContainer.appendChild(startButton);
  buttonContainer.appendChild(stopButton);

  document.body.appendChild(buttonContainer);
}

centerButtons();
styleButtons();

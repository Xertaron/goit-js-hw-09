import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

let timerId = null;
let futureDate = null;
let presentDate = null;

const pickDate = document.querySelector('#datetime-picker');

const dataButton = document.querySelector('[data-start]');
dataButton.setAttribute('disabled', '');
dataButton.style.opacity = '50%';
dataButton.style.padding = '1px 10px';

const items = document.querySelector('.timer');
items.style.display = 'flex';
items.style.gap = '30px';
items.style.fontSize = '50px';

Report.info(
  'Greetings traveller.',
  'Please select a future date and click start.',
  'Acknowledged'
);

flatpickr(pickDate, {
  defaultDate: new Date(),
  minuteIncrement: 1,
  time_24hr: true,
  enableTime: true,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Report.failure(
        'Traveler.',
        "I know you may be weary but i just asked to select future date. Present or past one unfortunately won't do.",
        'All right'
      );
    } else {
      Report.success(
        'Thank you Traveler.',
        'Once you press start, the sands of time shall begin the countdown to your chosen date.',
        "Let's do this"
      );
      dataButton.removeAttribute('disabled', '');
      dataButton.style.opacity = '100%';
      const clock = () => {
        futureDate = selectedDates[0].getTime();
        countdown.start();
      };
      dataButton.addEventListener('click', clock);
    }
  },
});
const countdown = {
  halt() {
    clearInterval(timerId);
    this.timerId = null;
    dataButton.setAttribute('disabled', '');
    pickDate.removeAttribute('disabled', '');
  },
  displayClock(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.displayRemainingTime(Math.floor(ms / day));
    const hours = this.displayRemainingTime(Math.floor((ms % day) / hour));
    const minutes = this.displayRemainingTime(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.displayRemainingTime(
      Math.floor((((ms % day) % hour) % minute) / second)
    );
    return { days, hours, minutes, seconds };
  },
  displayRemainingTime(value) {
    return String(value).padStart(2, 0);
  },
  selector: document.querySelector('.timer'),
  start() {
    timerId = setInterval(() => {
      dataButton.setAttribute('disabled', '');
      pickDate.setAttribute('disabled', '');
      presentDate = Date.now();
      const difference = futureDate - presentDate;

      if (difference <= 0) {
        this.halt();
        Report.info(
          'Traveler',
          'The sands of time shifted all the way through the hourglass. If you wish to make them flow again, select a new date and press start. Alternatively, reload this page.',
          'Very well'
        );

        return;
      }
      const { days, hours, minutes, seconds } = this.displayClock(difference);
      this.selector.querySelector('[data-days]').textContent =
        this.displayRemainingTime(days);
      this.selector.querySelector('[data-hours]').textContent =
        this.displayRemainingTime(hours);
      this.selector.querySelector('[data-minutes]').textContent =
        this.displayRemainingTime(minutes);
      this.selector.querySelector('[data-seconds]').textContent =
        this.displayRemainingTime(seconds);
    }, 1000);
  },
};

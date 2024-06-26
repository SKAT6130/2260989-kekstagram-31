const REMOVE_MESSAGE_TIMEOUT = 500;

const errorMessageTemplateElement = document.querySelector('#data-error').content.querySelector('.data-error');

function showErrorMessage() {
  const errorElement = errorMessageTemplateElement.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
}

function debounce (callback, timeoutDelay = REMOVE_MESSAGE_TIMEOUT) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const isEscKeyDown = (evt) => evt.key === 'Escape';

export { getRandomNumber, showErrorMessage, isEscKeyDown, debounce};

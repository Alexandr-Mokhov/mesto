const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.errorClassInput);
  errorElement.classList.add(config.errorClassSpan);
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.errorClassInput);
  errorElement.classList.remove(config.errorClassSpan);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

const checkInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (checkInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.classList.remove(config.activeButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.classList.add(config.activeButtonClass);
  }
}

//дезактивирую кнопку сохранения картинки для повторного добавления
function disableSubmitButton(buttonElement, config) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.classList.remove(config.activeButtonClass);
}

//активирую кнопку сохранения профиля при первом пуске
function enableSubmitButton(buttonElement, config) {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.classList.add(config.activeButtonClass);
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  enableSubmitButton(buttonElement, config)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}


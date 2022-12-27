// показать сообщение об ошибке
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.errorClassInput);
  errorElement.classList.add(config.errorClassSpan);
  errorElement.textContent = errorMessage;
}

// скрыть сообщение об ошибке
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.errorClassInput);
  errorElement.classList.remove(config.errorClassSpan);
  errorElement.textContent = '';
}

// вкл/выкл отображения сообщение об ошибке исходя из валидности
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// проверка на валидность
function checkInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// дезактивация кнопок сохранения попапов
function disableSubmitButton(buttonElement, config) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.classList.remove(config.activeButtonClass);
}

// активация кнопок сохранения попапов
function enableSubmitButton(buttonElement, config) {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.classList.add(config.activeButtonClass);
}

// изменение вида и функциональности кнопки в зависимости от валидности
function toggleButtonState(inputList, buttonElement, config) {
  if (checkInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, config);
  } else {
    enableSubmitButton(buttonElement, config);
  }
}

// находим все инпуты и кнопки, выставляем слушатели с проверкой валидации ввода и переключения вида кнопки
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

// находим формы передаем в set
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

enableValidation(validationConfig);

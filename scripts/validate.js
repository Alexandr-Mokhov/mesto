const validationConfiguration = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_type_inactive',
  activeButtonClass: 'popup__save_type_active',
  errorClassInput: 'popup__input_type_error',
  errorClassSpan: 'popup__input-error_active',
};

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

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.classList.remove(config.activeButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.classList.add(config.activeButtonClass);
  }
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  disableSubmitButton();
  enableSubmitButton();
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

enableValidation(validationConfiguration);

//дезактивирую кнопку сохранения картинки
function disableSubmitButton() {
  const buttonCard = document.querySelector('.popup__save_type_card');
  buttonCard.classList.add('popup__save_type_inactive');
  buttonCard.classList.remove('popup__save_type_active');
}

//активирую кнопку сохранения профиля при первом пуске
function enableSubmitButton() {
  const buttonProfile = document.querySelector('.popup__save_type_profile');
  buttonProfile.classList.remove('popup__save_type_inactive');
  buttonProfile.classList.add('popup__save_type_active');
}

document.querySelector('.popup__save_type_card').addEventListener('click', disableSubmitButton);

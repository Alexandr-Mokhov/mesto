const profileEdit = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const popupProfile = document.querySelector('.popup_type_profile');
const popupContainerProfile = document.querySelector('.popup__container_type_profile');
const buttonCloseProfile = document.querySelector('.popup__close_type_profile');
const inputName = document.querySelector('.popup__input_type_name');
const inputProfession = document.querySelector('.popup__input_type_profession');

const cardsContainer = document.querySelector('.elements__cards');
const template = document.querySelector('#elements__item-template');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_card');
const popupContainerCard = popupCard.querySelector('.popup__container_type_card');
const buttonCloseCard = popupCard.querySelector('.popup__close_type_card');
const inputCardName = popupCard.querySelector('.popup__input_type_card-name');
const inputCardLink = popupCard.querySelector('.popup__input_type_card-link');

const popupImage = document.querySelector('.popup_type_image');
const popupContainerImage = popupImage.querySelector('.popup__container_type_image');
const buttonCloseImage = popupImage.querySelector('.popup__close_type_image');
const imagePopup = popupImage.querySelector('.popup__image');
const popupTitleImage = popupImage.querySelector('.popup__title_type_image');

const formCard = document.querySelector('.popup__form_type_card');

// добавляем картинки через темплейт
const createCard = (cardName) => {
  const card = template.content.querySelector('.elements__item').cloneNode(true);
  const elementsImage = card.querySelector('.elements__image');
  const elementsName = card.querySelector('.elements__name');
  const elementsHeart = card.querySelector('.elements__heart');
  const elementsDelete = card.querySelector('.elements__delete');

  elementsName.textContent = cardName.name;
  elementsImage.setAttribute('src', cardName.link);
  elementsImage.setAttribute('alt', cardName.name);

  // открыть просмотр картинок
  function openViewImage () {
    openPopup(popupImage);
    imagePopup.setAttribute('src', cardName.link);
    imagePopup.setAttribute('alt', cardName.name);
    popupTitleImage.textContent = cardName.name;
  }

  // лайки
  function setLike () {
    elementsHeart.classList.toggle('elements__heart_type_active');
  }

  // удаление картинок
  function deleteCard () {
    card.remove();
  }

  elementsImage.addEventListener('click', openViewImage);
  elementsHeart.addEventListener('click', setLike);
  elementsDelete.addEventListener('click', deleteCard);

  return card;
}

function renderCard (cardName) {
  cardsContainer.prepend(createCard(cardName));
}

initialCards.forEach((cardName) => {
  renderCard(cardName);
});

// общая функция открытия попап
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

// общая функция закрытя попап
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

// открыть редактирование профиля
function openEditingProfile () {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

// закрытие редактирование профиля
function closeEditingProfile () {
  closePopup(popupProfile);
}

// очистка формы
function resetForm() {
  formCard.reset();
}

// открыть добавление карточек
function openAddCard () {
  openPopup(popupCard);
  resetForm();
}

// закрыть добавление карточек
function closeAddCard () {
  closePopup(popupCard);
}

// сохранение изменений профиля
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(popupProfile);
}

// сохранение новых карточек
function handleCardSubmit (evt) {
  evt.preventDefault();
  const card = {
    name: inputCardName.value,
    link: inputCardLink.value
  };
  renderCard(card);
  closePopup(popupCard);
}

// закрыть просмотр карточек
function closeViewImage () {
  closePopup(popupImage);
}

popupContainerProfile.addEventListener('submit', handleFormSubmit);
popupContainerCard.addEventListener('submit', handleCardSubmit);
profileEdit.addEventListener('click', openEditingProfile);
buttonCloseProfile.addEventListener('click', closeEditingProfile);
buttonAddCard.addEventListener('click', openAddCard);
buttonCloseCard.addEventListener('click', closeAddCard);
buttonCloseImage.addEventListener('click', closeViewImage);

const formElement = document.querySelector('.popup__form');
const formInput = document.querySelector('.popup__input');

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__input-error_active');
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
//console.log(inputElement.validity.valid);
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__save_type_inactive');
    buttonElement.classList.remove('popup__save_type_active');
  } else {
    buttonElement.classList.remove('popup__save_type_inactive');
    buttonElement.classList.add('popup__save_type_active');
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__save');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();



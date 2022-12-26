const profileEdit = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const popupProfile = document.querySelector('.popup_type_profile');
const popupContainerProfile = document.querySelector('.popup__container_type_profile');
const buttonCloseProfile = document.querySelector('.popup__close_type_profile');
const inputName = document.querySelector('.popup__input_type_name');
const inputProfession = document.querySelector('.popup__input_type_profession');
const buttonSaveProfile = document.querySelector('.popup__save_type_profile');

const cardsContainer = document.querySelector('.elements__cards');
const template = document.querySelector('#elements__item-template');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_card');
const popupContainerCard = popupCard.querySelector('.popup__container_type_card');
const buttonCloseCard = popupCard.querySelector('.popup__close_type_card');
const inputCardName = popupCard.querySelector('.popup__input_type_card-name');
const inputCardLink = popupCard.querySelector('.popup__input_type_card-link');
const buttonSaveCard = popupCard.querySelector('.popup__save_type_card');

const popupImage = document.querySelector('.popup_type_image');
const buttonCloseImage = popupImage.querySelector('.popup__close_type_image');
const imagePopup = popupImage.querySelector('.popup__image');
const popupTitleImage = popupImage.querySelector('.popup__title_type_image');

const formCard = document.querySelector('.popup__form_type_card');
const popupList = document.querySelectorAll('.popup');
const keyEscape = 'Escape';

// добавляем картинки через темплейт
function createCard(cardName) {
  const card = template.content.querySelector('.elements__item').cloneNode(true);
  const elementsImage = card.querySelector('.elements__image');
  const elementsName = card.querySelector('.elements__name');
  const elementsHeart = card.querySelector('.elements__heart');
  const elementsDelete = card.querySelector('.elements__delete');

  elementsName.textContent = cardName.name;
  elementsImage.setAttribute('src', cardName.link);
  elementsImage.setAttribute('alt', cardName.name);

  // открыть просмотр картинок
  elementsImage.addEventListener('click', () => {
    openPopup(popupImage);
    imagePopup.setAttribute('src', cardName.link);
    imagePopup.setAttribute('alt', cardName.name);
    popupTitleImage.textContent = cardName.name;
  });

  // лайки
  elementsHeart.addEventListener('click', () => {
    elementsHeart.classList.toggle('elements__heart_type_active');
  });

  // удаление картинок
  elementsDelete.addEventListener('click', () => {
    card.remove();
  });

  return card;
}

function renderCard(cardName) {
  cardsContainer.prepend(createCard(cardName));
}

initialCards.forEach((cardName) => {
  renderCard(cardName);
});

//закрытие попап на Esc
function closePopupEsc(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === keyEscape) {
    closePopup(popup);
    evt.target.blur();
  }
}

//закрытие попап на Overlay
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
});

// общая функция открытия попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

// общая функция закрытя попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

// открыть редактирование профиля
profileEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  enableSubmitButton(buttonSaveProfile, validationConfig);
});

// закрытие редактирование профиля
buttonCloseProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});

// открыть добавление карточек
buttonAddCard.addEventListener('click', () => {
  openPopup(popupCard);
  formCard.reset();
  disableSubmitButton(buttonSaveCard, validationConfig);
});

// закрыть добавление карточек
buttonCloseCard.addEventListener('click', () => {
  closePopup(popupCard);
});

// сохранение изменений профиля
popupContainerProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup (popupProfile);
});

// сохранение новых карточек
popupContainerCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const card = {
    name: inputCardName.value,
    link: inputCardLink.value
  };
  renderCard(card);
  closePopup(popupCard);
});

// закрыть просмотр карточек
  buttonCloseImage.addEventListener('click', () => closePopup(popupImage));

enableValidation(validationConfig);


const profileEdit = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const popupProfile = document.querySelector('.popup_profile');
const profileForm = document.querySelector('.popup__container_profile');
const popupCloseButton = document.querySelector('.popup__close_profile');
const popupSaveButton = document.querySelector('.popup__save_profile');
const inputName = document.querySelector('.popup__input_type_name');
const inputProfession = document.querySelector('.popup__input_type_profession');

const cardsContainer = document.querySelector('.elements__cards');
const template = document.querySelector('#elements__item-template');

const addCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_card');
const cardForm = popupCard.querySelector('.popup__container_card');
const popupCloseCard = popupCard.querySelector('.popup__close_card');
const cardSaveButton = popupCard.querySelector('.popup__save-card');
const inputCardName = popupCard.querySelector('.popup__input_type_card-name');
const inputCardLink = popupCard.querySelector('.popup__input_type_card-link');

const popupImage = document.querySelector('.popup_image');
const imageForm = popupImage.querySelector('.popup__container_image');
const popupCloseImage = popupImage.querySelector('.popup__close_image');
const imagePopup = popupImage.querySelector('.popup__image');
const popupTitleImage = popupImage.querySelector('.popup__title_image');
const elementsHeart = document.querySelector('.elements__heart');

const elementsImage = document.querySelector('.elements__image');
const elementsDelete = document.querySelector('.elements__delete');
const elementsHeard = document.querySelector('.elements__heart');
const elementsName = document.querySelector('.elements__name');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// добавляем картинки через темплейт
const createCard = (cardName) => {
  const card = template
    .content.querySelector('.elements__item')
    .cloneNode(true);
  card.querySelector('.elements__name').textContent = cardName.name;
  card.querySelector('.elements__image').setAttribute('src', cardName.link);
  card.querySelector('.elements__image').setAttribute('alt', cardName.name);

  // открыть просмотр карточек
  card.querySelector('.elements__image').addEventListener('click', function() {
    popupOpened(popupImage);
    imageForm.classList.remove('popup__container');
    imagePopup.setAttribute('src', cardName.link);
    popupTitleImage.textContent = cardName.name;
    popupTitleImage.classList.remove('popup__title');
  });

  // лайки
  card.querySelector('.elements__heart').addEventListener('click', function() {
    card.querySelector('.elements__heart').classList.toggle('elements__heart_active');
  });

  // удаление картинок
  card.querySelector('.elements__delete').addEventListener('click', function() {
    card.remove();
  });

  return card;
}

const renderCard = (cardName) => {
  cardsContainer.prepend(createCard(cardName));
}

initialCards.forEach((cardName) => {
  renderCard(cardName);
});

// общая функция открытия попап
function popupOpened (popup) {
  popup.classList.add('popup_opened');
}

// общая функция закрытя попап
function popupClose (popup) {
  popup.classList.remove('popup_opened');
}

// открыть редактирование профиля
profileEdit.addEventListener('click', function() {
  popupOpened(popupProfile);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
});

// закрытие редактирование профиля
popupCloseButton.addEventListener('click', () => {
  popupClose(popupProfile);
});

// открыть добавление карточек
addCard.addEventListener('click', function() {
  popupOpened(popupCard);
  inputCardName.value = "";
  inputCardLink.value = "";
});

// закрыть добавление карточек
popupCloseCard.addEventListener('click', function() {
  popupClose(popupCard);
});

// сохранение изменений профиля
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  popupClose(popupProfile);
}

// сохранение новых карточек
function handleCardSubmit (evt) {
  evt.preventDefault();
  let newObject = {
    name: inputCardName.value,
    link: inputCardLink.value
  };
  initialCards.push(newObject);
  renderCard(newObject);
  popupClose(popupCard);
}

// закрыть просмотр карточек
popupCloseImage.addEventListener('click', function() {
  popupClose(popupImage);
});

profileForm.addEventListener('submit', handleFormSubmit);
cardForm.addEventListener('submit', handleCardSubmit);




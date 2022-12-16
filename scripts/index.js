const profileEdit = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const popupProfile = document.querySelector('.popup_profile');
const popupContainerProfile = document.querySelector('.popup__container_type_profile');
const buttonCloseProfile = document.querySelector('.popup__close_type_profile');
const inputName = document.querySelector('.popup__input_type_name');
const inputProfession = document.querySelector('.popup__input_type_profession');

const cardsContainer = document.querySelector('.elements__cards');
const template = document.querySelector('#elements__item-template');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_card');
const popupContainerCard = popupCard.querySelector('.popup__container_type_card');
const buttonCloseCard = popupCard.querySelector('.popup__close_type_card');
const inputCardName = popupCard.querySelector('.popup__input_type_card-name');
const inputCardLink = popupCard.querySelector('.popup__input_type_card-link');

const popupImage = document.querySelector('.popup_image');
const popupContainerImage = popupImage.querySelector('.popup__container_type_image');
const buttonCloseImage = popupImage.querySelector('.popup__close_type_image');
const imagePopup = popupImage.querySelector('.popup__image');
const popupTitleImage = popupImage.querySelector('.popup__title_type_image');

const formCard = document.querySelector('.form_card');

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

  // открыть просмотр карточек
  elementsImage.addEventListener('click', function() {
    openPopup(popupImage);
    imagePopup.setAttribute('src', cardName.link);
    imagePopup.setAttribute('alt', cardName.name);
    popupTitleImage.textContent = cardName.name;
  });

  // лайки
  elementsHeart.addEventListener('click', function() {
    elementsHeart.classList.toggle('elements__heart_type_active');
  });

  // удаление картинок
  elementsDelete.addEventListener('click', function() {
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
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

// общая функция закрытя попап
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

// открыть редактирование профиля
profileEdit.addEventListener('click', function() {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
});

// закрытие редактирование профиля
buttonCloseProfile.addEventListener('click', function() {
  closePopup(popupProfile);
});

// остчистка формы
function resetForm() {
  formCard.reset();
}

// открыть добавление карточек
buttonAddCard.addEventListener('click', function() {
  openPopup(popupCard);
  resetForm();
});

// закрыть добавление карточек
buttonCloseCard.addEventListener('click', function() {
  closePopup(popupCard);
});

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
buttonCloseImage.addEventListener('click', function() {
  closePopup(popupImage);
});

popupContainerProfile.addEventListener('submit', handleFormSubmit);
popupContainerCard.addEventListener('submit', handleCardSubmit);

const profileEdit = document.querySelector('.profile__edit');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__container');
const popupCloseButton = popup.querySelector('.popup__close');
const popupSaveButton = popup.querySelector('.popup__save');
const inputName = popup.querySelector('.popup__input_type_name');
const inputProfession = popup.querySelector('.popup__input_type_profession');
//const


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

const cardsContainer = document.querySelector('.elements__cards');
const template =  document.querySelector('#elements__item-template');

const createCard = (cardName) => {
  const card = template
    .content.querySelector('.elements__item')
    .cloneNode(true)
  card.querySelector('.elements__name').textContent = cardName.name;
  card.querySelector('.elements__image').setAttribute('src', cardName.link);
  card.querySelector('.elements__image').setAttribute('alt', cardName.name);
  return card;
}

const renderCard = (cardName) => {
  cardsContainer.prepend(createCard(cardName));
}

initialCards.forEach((name) => {
  renderCard(name);
})

console.log();

function popupOpened () {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

function popupClose () {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  popup.classList.remove('popup_opened');
}

profileEdit.addEventListener('click', popupOpened);
popupCloseButton.addEventListener('click', popupClose);
popupForm.addEventListener('submit', handleFormSubmit);

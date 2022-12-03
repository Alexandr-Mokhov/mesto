let profileEdit = document.querySelector('.profile__edit');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__container');
let popupCloseButton = popup.querySelector('.popup__close');
let popupSaveButton = popup.querySelector('.popup__save');
let inputName = popup.querySelector('.popup__input_type_name');
let inputProfession = popup.querySelector('.popup__input_type_profession');

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

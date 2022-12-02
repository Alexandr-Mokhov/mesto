const profileEdit = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close');

profileEdit.addEventListener('click', function() {
  popup.classList.add('popup_opened');
});

popupClose.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');
let popupSave = document.querySelector('.popup__save');

function handleFormSubmit (evt) {
    evt.preventDefault();

    let popupName = document.querySelector('.popup__name');
    let popupProfession = document.querySelector('.popup__profession');

    profileName.textContent = popupName.value;
    profileProfession.textContent = popupProfession.value;

    popup.classList.remove('popup_opened');
}

popupSave.addEventListener('click', handleFormSubmit);


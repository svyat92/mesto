import { Card } from './card.js';
import { initialCards } from './dataCards.js';
import { FormValidator } from './validate.js';

const handleEscapePopup = (event) => {
  if (event.key === "Escape") {
    const popupObj = document.querySelector('.popup_active');
    closePopup(popupObj);
  }
}

const handleMousedowPopup = (event) => {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__close-btn')) {
    const popupObj = event.currentTarget;
    closePopup(popupObj);
  }
}

const setPopupEventListeners = popupObj => {
  popupObj.addEventListener('mousedown', handleMousedowPopup);
  document.addEventListener('keydown', handleEscapePopup);
};

const removePopupEventListeners = popupObj => {
  popupObj.removeEventListener('mousedown', handleMousedowPopup);
  document.removeEventListener('keydown', handleEscapePopup);
};

const openPopup = popupObj => {
  popupObj.classList.add('popup_active');
  setPopupEventListeners(popupObj);
}

const closePopup = popupObj => {
  popupObj.classList.remove('popup_active');
  removePopupEventListeners(popupObj);
}

const popupImage = document.querySelector('.popup_type_image');
const imageInPopup = popupImage.querySelector('.popup__image');
const description = popupImage.querySelector('.popup__desc');
const cardSection = document.querySelector('.elements');

const handleOpenImagePopup = (card) => {
  imageInPopup.src = card.link;
  imageInPopup.alt = card.name;
  description.textContent = card.name;
  openPopup(popupImage);
}

const renderCard = (card) => {
  const newCard = new Card(card, '#place-card', handleOpenImagePopup);
  cardSection.prepend(newCard.generateCard());
}

const renderForm = (formObj) => {
  // const inputList = Array.from(formObj.querySelectorAll('.form__input'));
  // const buttonObj = formObj.querySelector('.form__submit-btn');
  // toggleButtonState(inputList, buttonObj, validationSettings);
  // inputList.forEach((inputObj) => {
  //   hideInputError(formObj, inputObj, validationSettings);
  // });
}


const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};


// Форма редактирования профиля
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.form');
const inputTitle = formEditProfile.querySelector('.form__input_content_title');
const inputSubTitle = formEditProfile.querySelector('.form__input_content_subtitle');
const validatorEditProfile = new FormValidator(validationSettings, formEditProfile);
validatorEditProfile.enableValidation();

buttonEditProfile.addEventListener('click', () => {
  inputTitle.value = profileTitle.textContent;
  inputSubTitle.value = profileSubTitle.textContent;
  validatorEditProfile.resetError();
  renderForm(formEditProfile);
  openPopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', () => {
  profileTitle.textContent = inputTitle.value;
  profileSubTitle.textContent = inputSubTitle.value;
  closePopup(popupEditProfile);
});

// Форма добавления карточки
const buttonAddCard = document.querySelector('.profile__add-btn');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.form');
const inputName = formAddCard.querySelector('.form__input_content_name');
const inputUrl = formAddCard.querySelector('.form__input_content_url');
const validatorAddCard = new FormValidator(validationSettings, formAddCard)
validatorAddCard.enableValidation();

buttonAddCard.addEventListener('click', () => {
  formAddCard.reset();
  validatorAddCard.resetError();
  openPopup(popupAddCard);
});

formAddCard.addEventListener('submit', () => {
  renderCard({ name: inputName.value, link: inputUrl.value });
  closePopup(popupAddCard);
});

// Добавляем все карточки из начального массива на страницу
initialCards.reverse().forEach(card => renderCard(card));

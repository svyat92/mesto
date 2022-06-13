import { Card } from './Card.js';
import { initialCards } from './dataCards.js';
import { FormValidator } from './FormValidator.js';

// Настройки валидации
const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

// Элементы всплывающего окна с картинкой
const popupImage = document.querySelector('.popup_type_image');
const imageInPopup = popupImage.querySelector('.popup__image');
const description = popupImage.querySelector('.popup__desc');

// Блок с карточками
const cardSection = document.querySelector('.elements');

// Элементы формы редактирования профиля
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.form');
const inputTitle = formEditProfile.querySelector('.form__input_content_title');
const inputSubTitle = formEditProfile.querySelector('.form__input_content_subtitle');
const validatorEditProfile = new FormValidator(validationSettings, formEditProfile);

// Элементы формы добавления карточки
const buttonAddCard = document.querySelector('.profile__add-btn');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.form');
const inputName = formAddCard.querySelector('.form__input_content_name');
const inputUrl = formAddCard.querySelector('.form__input_content_url');
const validatorAddCard = new FormValidator(validationSettings, formAddCard)

// Закрыть всплывающие окно при нажатии Esc
const handleEscapePopup = (event) => {
  if (event.key === "Escape") {
    const popupObj = document.querySelector('.popup_active');
    closePopup(popupObj);
  }
}

// Закрыть всплывающие окно при нажатии мыши
const handleMousedowPopup = (event) => {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__close-btn')) {
    const popupObj = event.currentTarget;
    closePopup(popupObj);
  }
}

// Установить слушатели для всплывающиего окна
const setPopupEventListeners = popupObj => {
  popupObj.addEventListener('mousedown', handleMousedowPopup);
  document.addEventListener('keydown', handleEscapePopup);
};

// Удалить слушатели для всплывающего окна
const removePopupEventListeners = popupObj => {
  popupObj.removeEventListener('mousedown', handleMousedowPopup);
  document.removeEventListener('keydown', handleEscapePopup);
};

// Открыть всплывающее окно
const openPopup = popupObj => {
  popupObj.classList.add('popup_active');
  setPopupEventListeners(popupObj);
}

// Закрыть всплывающее окно
const closePopup = popupObj => {
  popupObj.classList.remove('popup_active');
  removePopupEventListeners(popupObj);
}

// Открыть всплывающее окно с картинкой, при нажатии на карточку
const handleOpenImagePopup = (card) => {
  imageInPopup.src = card.link;
  imageInPopup.alt = card.name;
  description.textContent = card.name;
  openPopup(popupImage);
}

// Создать новый экземпляр карточки, добавить в DOM
const renderCard = (card) => {
  const newCard = new Card(card, '#place-card', handleOpenImagePopup);
  cardSection.prepend(newCard.generateCard());
}

// Устанавливаем слушатель для кнопки "Редактировать профиль"
buttonEditProfile.addEventListener('click', () => {
  inputTitle.value = profileTitle.textContent;
  inputSubTitle.value = profileSubTitle.textContent;
  validatorEditProfile.resetError();
  openPopup(popupEditProfile);
});

// Устанавливаем слушатель для формы редактирования профиля
formEditProfile.addEventListener('submit', () => {
  profileTitle.textContent = inputTitle.value;
  profileSubTitle.textContent = inputSubTitle.value;
  closePopup(popupEditProfile);
});

// Устанавливаем слушатель для кнопки "Добавить карточку"
buttonAddCard.addEventListener('click', () => {
  formAddCard.reset();
  validatorAddCard.resetError();
  openPopup(popupAddCard);
});

// Устанавливаем слушатель для формы добавления карточки
formAddCard.addEventListener('submit', () => {
  renderCard({ name: inputName.value, link: inputUrl.value });
  closePopup(popupAddCard);
});

// Включаем валидацию для формы добавления карточки
validatorAddCard.enableValidation();

// Включаем валидацию для формы редактирования профиля
validatorEditProfile.enableValidation();

// Добавляем все карточки из начального массива на страницу
initialCards.reverse().forEach(card => renderCard(card));

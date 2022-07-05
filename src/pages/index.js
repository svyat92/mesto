import './index.css';
import { Card } from '../components/Card.js';
import { initialCards } from '../components/dataCards.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api';
import {
  validationSettings,
  cardSelector,
  userNameSelector,
  userDescSelector,
  popupImageSelector,
  popupAddCardSelector,
  popupEditProfileSelector,
  btnEditSelector,
  btnAddCardSelector,
  containerCardSelector
} from '../utils/constants.js';

// Функция добавления карточки в DOM
const renderCard = (data) => {
  const card = new Card({ 
    data: data, 
    handleCardClick: (card) => popupImage.open(card)
  }, cardSelector);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/cohort-42',
  token: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
});

api.getInitialCards()
  .then((result) => {
    initialCards = result;
  })
  .catch((err) => {
    // Пока просто вывожу ошибку в консоль
    console.log(err);
  }); 

// Валидация для формы добавления карточки
const validatorEditProfile = new FormValidator(
  validationSettings,
  document.querySelector(popupEditProfileSelector).querySelector('.form')
);
validatorEditProfile.enableValidation();

// Валидация для формы редактирования профиля
const validatorAddCard = new FormValidator(
  validationSettings,
  document.querySelector(popupAddCardSelector).querySelector('.form')
);
validatorAddCard.enableValidation();

// Данные пользователя
const userInfo = new UserInfo({
  userNameSelector,
  userDescSelector
});

api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo({
      userName: result.name,
      userDesc: result.about
    });
  })
  .catch((err) => {
    // Пока просто вывожу ошибку в консоль
    console.log(err);
  }); 

// Всплывающее окно с картинкой
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

// Всплывающее окно с формой добавления карточки
const popupAddCard = new PopupWithForm(popupAddCardSelector, (inputValues) => {
  renderCard(inputValues);
});
popupAddCard.setEventListeners();

// Всплывающее окно с формой редактирования
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, (inputValues) => {
  userInfo.setUserInfo(inputValues);
});
popupEditProfile.setEventListeners();

// Секция с карточками
const cardList = new Section({
  items: initialCards.reverse(),
  renderer: renderCard
}, containerCardSelector);
cardList.renderItems();

// Устиновить слушатель для кнопки "Редактировать профиль"
document.querySelector(btnEditSelector).addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getInfoUser());
  validatorEditProfile.resetError();
  popupEditProfile.open();
});

// Установить слушатель для кнопки "Добавить карточку"
document.querySelector(btnAddCardSelector).addEventListener('click', () => {
  validatorAddCard.resetError();
  popupAddCard.open();
});


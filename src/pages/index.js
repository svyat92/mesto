import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api';
import {
  validationSettings,
  popupAddCardSelector,
  popupEditProfileSelector,
  popupEditAvatarSelector
} from '../utils/constants.js';
import { showErr } from '../utils/utils';

// Функция добавления карточки в DOM
const renderCard = (data) => {
  const card = new Card({
    data: data,
    currentUserId: userInfo._id,
    handleCardClick: (card) => popupImage.open(card),
    handleDeleteClick: (card) => {
      const popupConfirmation = new PopupWithConfirmation({
        handleOkClick: () => {
          api.deleteCard(card.id)
            .then(() => card.deleteCard())
            .catch((err) => showErr(err))
            .finally(() => popupConfirmation.close());
        }
      }, '.popup_type_confirm');
      popupConfirmation.setEventListeners();
      popupConfirmation.open();
    },
    handeLikeClick: (card) => {
      if (card.isLike()) {
        api.deleteLike(card.id)
          .then((result) => {
            card.renderLikes(result.likes);
          })
          .catch((err) => showErr(err));
      } else {
        api.putLike(card.id)
          .then((result) => {
            card.renderLikes(result.likes);
          })
          .catch((err) => showErr(err));
      }
    }
  }, '#place-card');
  cardList.addItem(card.generateCard());
}

//
// Взаимодействие с сервером
const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  token: 'a1ff6e8d-0d81-4401-8c84-537e1b1bfaf5'
});

//
// Данные пользователя
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userDescSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
});

//
// Всплывающее окно с картинкой
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

//
// Всплывающее окно с формой добавления карточки
const popupAddCard = new PopupWithForm(popupAddCardSelector, (inputValues) => {
  api.postNewCard(inputValues)
    .then((result) => renderCard(result))
    .catch((err) => showErr(err));
});
popupAddCard.setEventListeners();
// Валидация для формы добавления карточки
const validatorEditProfile = new FormValidator(
  validationSettings,
  document.querySelector(popupEditProfileSelector).querySelector('.form')
);
validatorEditProfile.enableValidation();
// Установить слушатель для кнопки "Добавить карточку"
document.querySelector('.profile__add-btn').addEventListener('click', () => {
  validatorAddCard.resetError();
  popupAddCard.open();
});

//
// Всплывающее окно с формой редактирования
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, (inputValues) => {
  api.patchUserInfo(inputValues)
    .then((result) => userInfo.setUserInfo(result))
    .catch((err) => showErr(err));
});
popupEditProfile.setEventListeners();
// Валидация для формы редактирования профиля
const validatorAddCard = new FormValidator(
  validationSettings,
  document.querySelector(popupAddCardSelector).querySelector('.form')
);
validatorAddCard.enableValidation();
// Устиновить слушатель для кнопки "Редактировать профиль"
document.querySelector('.profile__edit-btn').addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getInfoUser());
  validatorEditProfile.resetError();
  popupEditProfile.open();
});

//
// Всплывающее окно с формой изменения аватарки
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, (inputValues) => {
  api.patchUserAvatar(inputValues)
    .then((result) => userInfo.setUserInfo(result))
    .catch((err) => showErr(err));
});
popupEditAvatar.setEventListeners();
// Валидация для формы изменения аватара
const validatorEditAvatar = new FormValidator(
  validationSettings,
  document.querySelector(popupEditAvatarSelector).querySelector('.form')
);
validatorEditAvatar.enableValidation();
// Установить слушатель для кнопки "Изменить аватар"
document.querySelector('.profile__image-wrapper').addEventListener('click', () => {
  popupEditAvatar.setInputValues(userInfo.getInfoUser());
  validatorEditAvatar.resetError();
  popupEditAvatar.open();
});

//
// Секция с карточками
const cardList = new Section({
  items: [],
  renderer: renderCard
}, '.elements');

// Запрос к серверу. Получаем информацию о пользователе
api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result);
  })
  .catch((err) => showErr(err));

// Запрос к серверу. Получаем массив карточек
api.getInitialCards()
  .then((result) => {
    cardList.setItems(result.reverse());
    cardList.renderItems();
  })
  .catch((err) => showErr(err));

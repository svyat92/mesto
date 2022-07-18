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
  popupEditAvatarSelector,
  imageWrapperElement,
  editProfileBtnElement,
  addCardBtnElement,
  addCardFormElement,
  editProfileFormElement,
  editAvatarFormElement
} from '../utils/constants.js';
import { showErr } from '../utils/utils';


/** 
 * Функция создания новой карточки
 * 
 * */
const createCard = (data) => {
  return new Card({
    data: data,
    currentUserId: userInfo._id,
    handleCardClick: (card) => popupImage.open(card),
    handleDeleteClick: (card) => {
      popupConfirmation.open(card);
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
}

/** 
 * Добавление карточки в DOM
 * 
 * */
const renderCard = (data) => {
  const card = createCard(data);
  cardList.addItem(card.generateCard());
}

/** 
 * Взаимодействие с сервером
 * 
 * */
const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  token: 'a1ff6e8d-0d81-4401-8c84-537e1b1bfaf5'
});

/** 
 * Данные пользователя 
 * 
 * */
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userDescSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
});


/** 
 * Всплывающее окно с подтверждением удаления карточки
 * 
 * */
const popupConfirmation = new PopupWithConfirmation({
  handleOkClick: (card) => {
    api.deleteCard(card.id)
      .then(() => card.deleteCard())
      .catch((err) => showErr(err));
  }
}, '.popup_type_confirm');
popupConfirmation.setEventListeners();


/** 
 * Всплывающее окно с картинкой
 * 
 * */
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();


/** 
 * Всплывающее окно с формой добавления карточки
 * 
 * */
const popupAddCard = new PopupWithForm(popupAddCardSelector, (inputValues) => {
  popupAddCard.renderLoading(true);
  api.postNewCard(inputValues)
    .then((result) => renderCard(result))
    .catch((err) => showErr(err))
    .finally(() => popupAddCard.renderLoading(false));
});
popupAddCard.setEventListeners();
/** Валидация для формы добавления карточки */
const validatorEditProfile = new FormValidator(
  validationSettings,
  addCardFormElement
);
validatorEditProfile.enableValidation();
/** Установить слушатель для кнопки "Добавить карточку" */
addCardBtnElement.addEventListener('click', () => {
  validatorAddCard.resetError();
  popupAddCard.open();
});


/** 
 * Всплывающее окно с формой редактирования
 * 
 * */
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, (inputValues) => {
  popupEditProfile.renderLoading(true);
  api.patchUserInfo(inputValues)
    .then((result) => userInfo.setUserInfo(result))
    .catch((err) => showErr(err))
    .finally(() => popupEditProfile.renderLoading(false));
});
popupEditProfile.setEventListeners();
/** Валидация для формы редактирования профиля */
const validatorAddCard = new FormValidator(
  validationSettings,
  editProfileFormElement
);
validatorAddCard.enableValidation();
/** Установить слушатель для кнопки "Редактировать профиль" */
editProfileBtnElement.addEventListener('click', () => {
  popupEditProfile.setInputValues(userInfo.getInfoUser());
  validatorEditProfile.resetError();
  popupEditProfile.open();
});


/** 
 * Всплывающее окно с формой изменения аватарки
 * 
 * */
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, (inputValues) => {
  popupEditAvatar.renderLoading(true);
  api.patchUserAvatar(inputValues)
    .then((result) => userInfo.setUserInfo(result))
    .catch((err) => showErr(err))
    .finally(() => popupEditAvatar.renderLoading(false));
});
popupEditAvatar.setEventListeners();
/** Валидация для формы изменения аватара */
const validatorEditAvatar = new FormValidator(
  validationSettings,
  editAvatarFormElement
);
validatorEditAvatar.enableValidation();
/** Установить слушатель для кнопки "Изменить аватар" */
imageWrapperElement.addEventListener('click', () => {
  popupEditAvatar.setInputValues(userInfo.getInfoUser());
  validatorEditAvatar.resetError();
  popupEditAvatar.open();
});



/** 
 * Секция с карточками
 * 
 * */
const cardList = new Section({
  renderer: renderCard
}, '.elements');

/** 
 * Запросы к серверу. Получаем информацию о пользователе и массив карточек
 * 
 * */
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    cardList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(err)
    showErr('Не удалось получить данные с сервера')
  });

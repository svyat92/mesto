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
  cardSelector,
  userNameSelector,
  userDescSelector,
  popupImageSelector,
  popupAddCardSelector,
  popupEditProfileSelector,
  popupConfirmationSelector,
  btnEditSelector,
  btnAddCardSelector,
  containerCardSelector
} from '../utils/constants.js';


// Функция добавления карточки в DOM
const renderCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: (card) => popupImage.open(card),
    handleDeleteClick: (card) => {
      // Всплывающее окно с подверждением удаления карточки
      const popupConfirmation = new PopupWithConfirmation({
        handleSubmit: () => {
          card.deleteCard();
        }
      }, popupConfirmationSelector);
      popupConfirmation.setEventListeners();
      popupConfirmation.open()
    }
  }, cardSelector);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

const api = new Api({
  serverUrl: 'https://mesto.nomoreparties.co/cohort-45',
  token: 'a1ff6e8d-0d81-4401-8c84-537e1b1bfaf5'
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
  userDescSelector,
  userAvatarSelector: '.profile__avatar'
});

api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo({
      userName: result.name,
      userDesc: result.about
    });
    userInfo.setUserAvatar(result.avatar);
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
  items: [],
  renderer: renderCard
}, containerCardSelector);
// cardList.renderItems();

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

api.getInitialCards()
  .then((result) => {
    cardList.setItems(result);
    cardList.renderItems();
  })
  .catch((err) => {
    // Пока просто вывожу ошибку в консоль
    console.log(err);
  });

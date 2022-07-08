// Настройки валидации
export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};


/** Селектор всплывающего окна с картинкой */
export const popupImageSelector = '.popup_type_image';

/** Селектор всплывающего окна с формой добавления карточки */
export const popupAddCardSelector = '.popup_type_add-card';

/** Селектор всплывающего окна с формой редактирования профиля */
export const popupEditProfileSelector = '.popup_type_edit-profile';

/** Селектор всплывающего окна с формой изменения аватара */
export const popupEditAvatarSelector = '.popup_type_edit-avatar';

/** Автарка пользователя */
export const imageWrapperElement = document.querySelector('.profile__image-wrapper');

/** Кнопка "Изменить профиль" */
export const editProfileBtnElement = document.querySelector('.profile__edit-btn');

/** Кнопка "Добавить карточку" */
export const addCardBtnElement = document.querySelector('.profile__add-btn');

/** Форма добавления карточки */
export const addCardFormElement = document.querySelector(popupAddCardSelector).querySelector('.form');

/** Форма редактирования профиля */
export const editProfileFormElement = document.querySelector(popupEditProfileSelector).querySelector('.form');

/** Форма изменения аватара */
export const editAvatarFormElement = document.querySelector(popupEditAvatarSelector).querySelector('.form')

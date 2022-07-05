// Настройки валидации
export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

// Селектор карточки
export const cardSelector = '#place-card';

// Селектор элемента с именем пользователя
export const userNameSelector = '.profile__title';

// Селектор элемента с описанием пользователя
export const userDescSelector = '.profile__subtitle';

// Селектор всплывающего окна с картинкой
export const popupImageSelector = '.popup_type_image';

// Селектор всплывающего окна с формой добавления карточки
export const popupAddCardSelector = '.popup_type_add-card';

// Селектор всплывающего окна с формой редактирования профиля
export const popupEditProfileSelector = '.popup_type_edit-profile';

// Селектор всплывающего окна с подверждением удаления карточки
export const popupConfirmationSelector = '.popup_type_confirm'

// Селектор кнопки "Реадктировать профиль"
export const btnEditSelector = '.profile__edit-btn';

// Селектор кнопки "Добавить карточку"
export const btnAddCardSelector = '.profile__add-btn';

// Селектор контейнера с карточками
export const containerCardSelector = '.elements';

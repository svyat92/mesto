const handleEscapePopup = (event) => {
  if (event.key === "Escape") {
    const popupObj = document.querySelector('.popup_active');
    closePopup(popupObj);
  }
}

const handleMousedowPopup = (event) => {
  if (event.target === event.currentTarget || event.target.classList.contains('popup__close-btn')) {
    const popupObj = document.querySelector('.popup_active');
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

const cardSection = document.querySelector('.elements');
const cardTemplate = document.querySelector('#place-card').content;
const popupImage = document.querySelector('.popup_type_image');
const imageInPopup = popupImage.querySelector('.popup__image');
const description = popupImage.querySelector('.popup__desc');

// Возвращает DOM объект с новой карточкой
const createCard = card => {
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);
  const imageInCard = newCard.querySelector('.element__image');
  imageInCard.src = card.link;
  imageInCard.alt = card.name;
  newCard.querySelector('.element__title').textContent = card.name;
  newCard.querySelector('.element__delete-btn').addEventListener('click', event => {
    event.target.closest('.element').remove();
  });
  newCard.querySelector('.element__like-btn').addEventListener('click', event => {
    event.target.classList.toggle('element__like-btn_active');
  });
  imageInCard.addEventListener('click', event => {
    imageInPopup.src = card.link;
    imageInPopup.alt = card.name;
    description.textContent = card.name;
    openPopup(popupImage);
  });
  return newCard;
}

const renderCard = (card) => {
  cardSection.prepend(createCard(card));
}

const renderForm = (formObj) => {
  const inputList = Array.from(formObj.querySelectorAll('.form__input'));
  const buttonObj = formObj.querySelector('.form__submit-btn');
  toggleButtonState(inputList, buttonObj, validationSettings);
  inputList.forEach((inputObj) => {
    hideInputError(formObj, inputObj, validationSettings);
  });
}

const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.form');
const inputTitle = formEditProfile.querySelector('.form__input_content_title');
const inputSubTitle = formEditProfile.querySelector('.form__input_content_subtitle');

buttonEditProfile.addEventListener('click', () => {
  inputTitle.value = profileTitle.textContent;
  inputSubTitle.value = profileSubTitle.textContent;
  renderForm(formEditProfile);
  openPopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', () => {
  profileTitle.textContent = inputTitle.value;
  profileSubTitle.textContent = inputSubTitle.value;
  closePopup(popupEditProfile);
});

const buttonAddCard = document.querySelector('.profile__add-btn');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.form');
const inputName = formAddCard.querySelector('.form__input_content_name');
const inputUrl = formAddCard.querySelector('.form__input_content_url');

buttonAddCard.addEventListener('click', () => {
  formAddCard.reset();
  renderForm(formAddCard);
  openPopup(popupAddCard);
});

formAddCard.addEventListener('submit', () => {
  renderCard({ name: inputName.value, link: inputUrl.value });
  closePopup(popupAddCard);
});

// Добавляем все карточки из начального массива на страницу
initialCards.reverse().forEach(card => renderCard(card));

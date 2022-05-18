const openPopup = popupObj => popupObj.classList.add('popup_active');
const closePopup = popupObj => popupObj.classList.remove('popup_active');

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

const renderCard = card => {
  cardSection.prepend(createCard(card));
}

// Добавляем все карточки из начального массива на страницу
initialCards.forEach(renderCard);

/**
 * Редактирование профиля
 */
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const buttonEditProfile = document.querySelector('.profile__edit-btn');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const inputTitle = formEditProfile.querySelector('.popup__input_content_title');
const inputSubTitle = formEditProfile.querySelector('.popup__input_content_subtitle');

buttonEditProfile.addEventListener('click', event => {
  inputTitle.value = profileTitle.textContent;
  inputSubTitle.value = profileSubTitle.textContent;
  openPopup(popupEditProfile);
});

popupEditProfile.addEventListener('submit', event => {
  event.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileSubTitle.textContent = inputSubTitle.value;
  closePopup(popupEditProfile);
});

/**
 * Добавление новой карточки
 */
const buttonAddCard = document.querySelector('.profile__add-btn');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const inputName = formAddCard.querySelector('.popup__input_content_name');
const inputUrl = formAddCard.querySelector('.popup__input_content_url');

buttonAddCard.addEventListener('click', event => {
  formAddCard.reset();
  openPopup(popupAddCard);
});

formAddCard.addEventListener('submit', event => {
  event.preventDefault();
  renderCard({ name: inputName.value, link: inputUrl.value });
  closePopup(popupAddCard);
});

// Добавляем всем кнопкам закрытия всплывающих окнон одинаковый слушатель
const buttonsClosePopup = document.querySelectorAll('.popup__close-btn');
buttonsClosePopup.forEach(button => {
  button.addEventListener('click', event => {
    closePopup(event.target.closest('.popup'));
  });
});

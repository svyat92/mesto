const imagePopup = document.querySelector('.popup-image');

function addCard(card, prepend = false) {
  const cardSection = document.querySelector('.elements');
  const cardTemplate = document.querySelector('#place-card').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image')
  elementImage.src = card.link;
  elementImage.alt = card.name;
  cardElement.querySelector('.element__title').textContent = card.name;
  cardElement.querySelector('.element__delete-btn').addEventListener('click', event => {
    event.target.closest('.element').remove();
  });
  cardElement.querySelector('.element__like-btn').addEventListener('click', event => {
    event.target.classList.toggle('element__like-btn_active');
  });
  elementImage.addEventListener('click', event => {
    const image = imagePopup.querySelector('.popup-image__image');
    image.src = card.link;
    image.alt = card.name;
    imagePopup.querySelector('.popup-image__desc').textContent = card.name;
    openPopup(imagePopup);
  });
  if (prepend === true) {
    cardSection.prepend(cardElement);
  } else {
    cardSection.append(cardElement);
  }

}

function openPopup(popupObj) {
  popupObj.classList.add('popup_active');
}

function closeCurrentPopup(event) {
  const currentPopup = event.target.closest('.popup');
  currentPopup.classList.remove('popup_active');
}

function initCards() {
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  initialCards.forEach(card => addCard(card));
}

function initEditPopup() {
  const popup = document.querySelector('.popup-edit');
  const popupForm = popup.querySelector('.popup__form');
  const profileTitle = document.querySelector('.profile__title');
  const profileSubTitle = document.querySelector('.profile__subtitle');
  const editButton = document.querySelector('.profile__edit-btn');
  const inputTitle = popup.querySelector('.popup__input_content_title');
  const inputSubTitle = popup.querySelector('.popup__input_content_subtitle');

  editButton.addEventListener('click', event => {
    inputTitle.value = profileTitle.textContent;
    inputSubTitle.value = profileSubTitle.textContent;
    openPopup(popup);
  });

  popupForm.addEventListener('submit', event => {
    event.preventDefault();
    profileTitle.textContent = inputTitle.value;
    profileSubTitle.textContent = inputSubTitle.value;
    closeCurrentPopup(event);
  });
}

function initAddPopup() {
  const popup = document.querySelector('.popup-add');
  const popupForm = popup.querySelector('.popup__form');
  const addButton = document.querySelector('.profile__add-btn');
  const inputName = popup.querySelector('.popup__input_content_name');
  const inputUrl = popup.querySelector('.popup__input_content_url');

  addButton.addEventListener('click', event => {
    inputName.value = null;
    inputUrl.value = null;
    openPopup(popup);
  });

  popupForm.addEventListener('submit', event => {
    event.preventDefault();
    addCard({ name: inputName.value, link: inputUrl.value }, true);
    closeCurrentPopup(event);
  });
}

function initImagePopup() {
  
  const addButton = document.querySelector('.profile__add-btn');
  const inputName = popup.querySelector('.popup__input_content_name');
  const inputUrl = popup.querySelector('.popup__input_content_url');

  addButton.addEventListener('click', event => {
    inputName.value = null;
    inputUrl.value = null;
    openPopup(popup);
  });

  popupForm.addEventListener('submit', event => {
    event.preventDefault();
    addCard({ name: inputName.value, link: inputUrl.value }, true);
    closeCurrentPopup(event);
  });
}

const closePopupButtons = document.querySelectorAll('.popup__close-btn');
closePopupButtons.forEach(button => {
  button.addEventListener('click', event => {
    closeCurrentPopup(event)
  });
});

initCards();
initEditPopup();
initAddPopup();

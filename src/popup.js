function querySelector(selector) {
  return document.querySelector(selector);
}

function openPopup(popupObj) {
  popupObj.classList.add('popup_active');
}

function closeCurrentPopup(event) {
  const currentPopup = event.target.closest('.popup');
  currentPopup.classList.remove('popup_active');
}

const popup = querySelector('.popup');
const profileTitle = querySelector('.profile__title');
const profileSubTitle = querySelector('.profile__subtitle');
const inputTitle = querySelector('.popup__input_content_title');
const inputSubTitle = querySelector('.popup__input_content_subtitle');

const editButton = querySelector('.profile__edit-btn');
const submitButton = querySelector('.popup__submit-btn');
const closeButton = querySelector('.popup__close-btn');

editButton.addEventListener('click', function (event) {
  inputTitle.value = profileTitle.textContent;
  inputSubTitle.value = profileSubTitle.textContent;
  openPopup(popup);
});

submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileSubTitle.textContent = inputSubTitle.value;
  closeCurrentPopup(event)
});

closeButton.addEventListener('click', function (event) {
  closeCurrentPopup(event)
});

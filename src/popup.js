function qs(selector) {
  return document.querySelector(selector);
}

function openPopup(popupObj) {
  popupObj.classList.add('popup_active');
}

function closeCurrentPopup(event) {
  const currentPopup = event.target.closest('.popup');
  currentPopup.classList.remove('popup_active');
}

const popup = qs('.popup');
const profileTitle = qs('.profile__title');
const profileSubTitle = qs('.profile__subtitle');
const inputTitle = qs('.popup__input_content_title');
const inputSubTitle = qs('.popup__input_content_subtitle');

const editButton = qs('.profile__edit-btn');
const submitButton = qs('.popup__submit-btn');
const closeButton = qs('.popup__close-btn');

editButton.addEventListener('click', function (event) {
  inputTitle.value = profileTitle.textContent;
  inputSubTitle.value = profileSubTitle.textContent;
  openPopup(popup);
});

submitButton.addEventListener('click', function (event) {
  profileTitle.textContent = inputTitle.value;
  profileSubTitle.textContent = inputSubTitle.value;
  closeCurrentPopup(event)
});

closeButton.addEventListener('click', function (event) {
  closeCurrentPopup(event)
});

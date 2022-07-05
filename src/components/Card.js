export class Card {
  name;
  link;
  likes;
  _cardSelector;
  _handleCardClick;
  _element;
  _elementImage;
  _elementLikeBtn;
  _elementLikeNumber;

  constructor({ data, handleCardClick }, cardSelector) {
    this.name = data.name;
    this.link = data.link;
    this.likes = data.likes ? data.likes : [];   
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeCard() {
    this._elementLikeBtn.classList.toggle('element__like-btn_active');
  }

  _setEventListeners() {
    this._element.querySelector('.element__delete-btn').addEventListener('click', () => this._handleDeleteCard());
    this._elementLikeBtn.addEventListener('click', () => this._handleLikeCard());
    this._elementImage.addEventListener('click', () => this._handleCardClick(this));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementLikeBtn = this._element.querySelector('.element__like-btn');
    this._elementLikeNumber = this._element.querySelector('.element__like-number');
    this._setEventListeners();

    this._elementImage.src = this.link;
    this._elementImage.alt = this.name;
    this._elementLikeNumber.textContent = this.likes.length;
    this._element.querySelector('.element__title').textContent = this.name;

    return this._element;
  }

}

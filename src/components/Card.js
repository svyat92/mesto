export class Card {
  id;
  name;
  link;
  likes;
  owner;
  _cardSelector;
  _handleCardClick;
  _handleDeleteClick;
  _handeLikeClick;
  _element;
  _elementImage;
  _elementLikeBtn;
  _elementDeleteBtn;
  _elementLikeNumber;
  _currentUserId;

  constructor({ data, currentUserId, handleCardClick, handleDeleteClick, handeLikeClick }, cardSelector) {
    this.id = data._id;
    this.name = data.name;
    this.link = data.link;
    this.owner = data.owner;
    this.likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handeLikeClick = handeLikeClick;
    this._cardSelector = cardSelector;
    this._currentUserId = currentUserId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  isLike() {
    return this.likes.find(like => like._id == this._currentUserId);
  }

  renderLikes(likes){
    this.likes = likes;
    this._elementLikeNumber.textContent = likes.length;
    if (this.isLike()) {
      this._elementLikeBtn.classList.add('element__like-btn_active');
    } else {
      this._elementLikeBtn.classList.remove('element__like-btn_active');
    }
  }

  _setEventListeners() {
    this._elementDeleteBtn.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });
    this._elementLikeBtn.addEventListener('click', () => this._handeLikeClick(this));
    this._elementImage.addEventListener('click', () => this._handleCardClick(this));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementLikeBtn = this._element.querySelector('.element__like-btn');
    this._elementLikeNumber = this._element.querySelector('.element__like-number');
    this._elementDeleteBtn = this._element.querySelector('.element__delete-btn');
    this._setEventListeners();

    this._elementImage.src = this.link;
    this._elementImage.alt = this.name;
    this._element.querySelector('.element__title').textContent = this.name;
    this.renderLikes(this.likes);
    if (this.owner._id !== this._currentUserId) {
      this._elementDeleteBtn.classList.add('element__delete-btn_hide');
    } 
    return this._element;
  }

}

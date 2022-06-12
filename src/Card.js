export class Card {
  name;
  link;
  #cardSelector;
  #handleOpenPopup;
  #element;
  #elementImage;

  constructor(card, cardSelector, handleOpenPopup) {
    this.name = card.name;
    this.link = card.link;
    this.#cardSelector = cardSelector;
    this.#handleOpenPopup = handleOpenPopup;
  }

  #getTemplate() {
    const cardElement = document
      .querySelector(this.#cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  #handleDeleteCard(event) {
    event.target.closest('.element').remove();
  }

  #handleLikeCard(event) {
    event.target.classList.toggle('element__like-btn_active');
  }

  #setEventListeners() {
    this.#element.querySelector('.element__delete-btn').addEventListener('click', this.#handleDeleteCard);
    this.#element.querySelector('.element__like-btn').addEventListener('click', this.#handleLikeCard);
    this.#elementImage.addEventListener('click', () => this.#handleOpenPopup(this));
  }

  generateCard() {
    this.#element = this.#getTemplate();
    this.#elementImage = this.#element.querySelector('.element__image');
    this.#setEventListeners();

    this.#elementImage.src = this.link;
    this.#elementImage.alt = this.name;
    this.#element.querySelector('.element__title').textContent = this.name;

    return this.#element;
  }

};

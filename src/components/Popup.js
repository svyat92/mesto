export class Popup {
  _popupElement;
  
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleMouseDownClose(event) {
    if (event.target === event.currentTarget || event.target.classList.contains('popup__close-btn')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (event) => this._handleMouseDownClose(event));
  }

  open() {
    this._popupElement.classList.add('popup_active');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_active');
    document.removeEventListener('keyup', this._handleEscClose);
  }
}

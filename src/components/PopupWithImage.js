import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  _imageElement;
  _descElement;

  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector('.popup__image');
    this._descElement = this._popupElement.querySelector('.popup__desc');
  }
  open(card) {
    this._imageElement.src = card.link;
    this._imageElement.alt = card.name;
    this._descElement.textContent = card.name;
    super.open();
  }
}

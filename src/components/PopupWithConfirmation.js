import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  _handleOkClick;
  _btnSubmit;
  _card;

  constructor({ handleOkClick }, popupSelector) {
    super(popupSelector);
    this._handleOkClick = handleOkClick;
    this._btnSubmit = this._popupElement.querySelector('.popup__ok-btn');
  }

  setEventListeners() {
    super.setEventListeners();
    this._btnSubmit.addEventListener('click', () => {
      this._handleOkClick(this._card);
      this.close();
    });
  }

  open(card) {
    super.open();
    this._card = card;
  }

}

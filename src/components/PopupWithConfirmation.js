import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  _handleOkClick;
  _btnSubmit;

  constructor({ handleOkClick }, popupSelector) {
    super(popupSelector);
    this._handleOkClick = handleOkClick;
    this._btnSubmit = this._popupElement.querySelector('.form__submit-btn');
  }

  setEventListeners() {
    super.setEventListeners();
    this._btnSubmit.addEventListener('click', this._handleOkClick);
  }

  close() {
    super.close();
    this._btnSubmit.removeEventListener('click', this._handleOkClick);
  }
}

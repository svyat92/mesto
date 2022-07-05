import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  _handleSubmit;
  _btnSubmit;

  constructor({ handleSubmit }, popupSelector) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._btnSubmit = this._popupElement.querySelector('.form__submit-btn');
    this._handleOkClick = this._handleOkClick.bind(this);
  }

  _handleOkClick() {
    this._handleSubmit();
    this.close();
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

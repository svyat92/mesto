import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  _handleSubmit;
  _formElement;
  _inputList;
  _formValues;
  _btnSubmitElement;

  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._formElement = this._popupElement.querySelector('.form');
    this._inputList = this._popupElement.querySelectorAll('.form__input');
    this._btnSubmitElement = this._formElement.querySelector('.form__submit-btn');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(values) {
    this._inputList.forEach(input => {
      input.value = values[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._btnSubmitElement.textContent = 'Сохранение...';
    } else {
      this._btnSubmitElement.textContent = 'Сохранить';
    }
  }

}

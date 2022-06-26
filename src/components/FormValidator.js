export class FormValidator {
  _settings;
  _formObj;
  _inputList;
  _buttonObj;

  constructor(settings, formObj) {
    this._settings = settings;
    this._formObj = formObj;
    this._inputList = Array.from(formObj.querySelectorAll(settings.inputSelector));
    this._buttonObj = formObj.querySelector(settings.submitButtonSelector);
  }

  _showInputError(inputObj, errorMessage) {
    const errorObj = this._formObj.querySelector(`.${inputObj.id}-error`);
    inputObj.classList.add(this._settings.inputErrorClass);
    errorObj.textContent = errorMessage;
    errorObj.classList.add(this._settings.errorClass);
  };

  _hideInputError(inputObj) {
    const errorObj = this._formObj.querySelector(`.${inputObj.id}-error`);
    inputObj.classList.remove(this._settings.inputErrorClass);
    errorObj.classList.remove(this._settings.errorClass);
    errorObj.textContent = '';
  };

  _checkInputValidity(inputObj) {
    if (!inputObj.validity.valid) {
      this._showInputError(inputObj, inputObj.validationMessage);
    } else {
      this._hideInputError(inputObj);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid)
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonObj.setAttribute('disabled', true);
      this._buttonObj.classList.add(this._settings.inactiveButtonClass);
    } else {
      this._buttonObj.removeAttribute('disabled');
      this._buttonObj.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputObj) => {
      inputObj.addEventListener('input', () => {
        this._checkInputValidity(inputObj);
        this._toggleButtonState();
      });
    });
  };

  resetError() {
    this._toggleButtonState();
    this._inputList.forEach((inputObj) => {
      this._hideInputError(inputObj);
    });
  }
  enableValidation() {
    this._formObj.addEventListener('submit', event => {
      event.preventDefault();
    });
    this._setEventListeners();
  };

}

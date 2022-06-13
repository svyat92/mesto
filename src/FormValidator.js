export class FormValidator {
  settings;
  formObj;
  inputList;
  buttonObj;

  constructor(settings, formObj) {
    this.settings = settings;
    this.formObj = formObj;
    this.inputList = Array.from(formObj.querySelectorAll(settings.inputSelector));
    this.buttonObj = formObj.querySelector(settings.submitButtonSelector);
  }

  #showInputError(inputObj, errorMessage) {
    const errorObj = this.formObj.querySelector(`.${inputObj.id}-error`);
    inputObj.classList.add(this.settings.inputErrorClass);
    errorObj.textContent = errorMessage;
    errorObj.classList.add(this.settings.errorClass);
  };

  #hideInputError(inputObj) {
    const errorObj = this.formObj.querySelector(`.${inputObj.id}-error`);
    inputObj.classList.remove(this.settings.inputErrorClass);
    errorObj.classList.remove(this.settings.errorClass);
    errorObj.textContent = '';
  };

  #checkInputValidity(inputObj) {
    if (!inputObj.validity.valid) {
      this.#showInputError(inputObj, inputObj.validationMessage);
    } else {
      this.#hideInputError(inputObj);
    }
  };

  #hasInvalidInput() {
    return this.inputList.some((input) => !input.validity.valid)
  };

  #toggleButtonState = () => {
    if (this.#hasInvalidInput()) {
      this.buttonObj.setAttribute('disabled', true);
      this.buttonObj.classList.add(this.settings.inactiveButtonClass);
    } else {
      this.buttonObj.removeAttribute('disabled');
      this.buttonObj.classList.remove(this.settings.inactiveButtonClass);
    }
  }

  #setEventListeners() {
    this.inputList.forEach((inputObj) => {
      inputObj.addEventListener('input', () => {
        this.#checkInputValidity(inputObj);
        this.#toggleButtonState();
      });
    });
  };

  resetError() {
    this.#toggleButtonState();
    this.inputList.forEach((inputObj) => {
      this.#hideInputError(inputObj);
    });
  }
  enableValidation() {
    this.formObj.addEventListener('submit', event => {
      event.preventDefault();
    });
    this.#setEventListeners();
  };

}

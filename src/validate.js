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

















/* 
const showInputError = (formObj, inputObj, errorMessage, settings) => {
  const errorObj = formObj.querySelector(`.${inputObj.id}-error`);
  inputObj.classList.add(settings.inputErrorClass);
  errorObj.textContent = errorMessage;
  errorObj.classList.add(settings.errorClass);
};

const hideInputError = (formObj, inputObj, settings) => {
  const errorObj = formObj.querySelector(`.${inputObj.id}-error`);
  inputObj.classList.remove(settings.inputErrorClass);
  errorObj.classList.remove(settings.errorClass);
  errorObj.textContent = '';
};

const checkInputValidity = (formObj, inputObj, settings) => {
  if (!inputObj.validity.valid) {
    showInputError(formObj, inputObj, inputObj.validationMessage, settings);
  } else {
    hideInputError(formObj, inputObj, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputList) => !inputList.validity.valid)
};

const toggleButtonState = (inputList, buttonObj, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonObj.setAttribute('disabled', true);
    buttonObj.classList.add(settings.inactiveButtonClass);
  } else {
    buttonObj.removeAttribute('disabled');
    buttonObj.classList.remove(settings.inactiveButtonClass);
  }
}

const setEventListeners = (formObj, settings) => {
  const inputList = Array.from(formObj.querySelectorAll(settings.inputSelector));
  const buttonObj = formObj.querySelector(settings.submitButtonSelector);
  inputList.forEach((inputObj) => {
    inputObj.addEventListener('input', () => {
      checkInputValidity(formObj, inputObj, settings);
      toggleButtonState(inputList, buttonObj, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formObj) => {
    formObj.addEventListener('submit', event => {
      event.preventDefault();
    });
    setEventListeners(formObj, settings);
  });
};

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

enableValidation(validationSettings); */

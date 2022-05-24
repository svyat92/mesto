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

enableValidation(validationSettings);

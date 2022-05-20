const showInputError = (formObj, inputObj, errorMessage) => {
  const errorObj = formObj.querySelector(`.${inputObj.id}-error`);
  inputObj.classList.add('form__input_type_error');
  errorObj.textContent = errorMessage;
  errorObj.classList.add('form__input-error_active');
};

const hideInputError = (formObj, inputObj) => {
  const errorObj = formObj.querySelector(`.${inputObj.id}-error`);
  inputObj.classList.remove('form__input_type_error');
  errorObj.classList.remove('form__input-error_active');
  errorObj.textContent = '';
};

const checkInputValidity = (formObj, inputObj) => {
  if (!inputObj.validity.valid) {
    showInputError(formObj, inputObj, inputObj.validationMessage);
  } else {
    hideInputError(formObj, inputObj);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputList) => !inputList.validity.valid)
};

const toggleButtonState = (inputList, buttonObj) => {
  if (hasInvalidInput(inputList)) {
    buttonObj.setAttribute('disabled', true);
    buttonObj.classList.add('form__submit-btn_inactive');
  } else {
    buttonObj.removeAttribute('disabled');
    buttonObj.classList.remove('form__submit-btn_inactive');
  }
}

const setEventListeners = (formObj) => {
  const inputList = Array.from(formObj.querySelectorAll('.form__input'));
  const buttonObj = formObj.querySelector('.form__submit-btn');
  inputList.forEach((inputObj) => {
    inputObj.addEventListener('input', () => {
      checkInputValidity(formObj, inputObj);
      toggleButtonState(inputList, buttonObj);
    });
  });
};

const enableValidation = () => {
  Array.from(document.forms).forEach((formObj) => {
    formObj.addEventListener('submit', event => {
      event.preventDefault();
    });
    setEventListeners(formObj);
  });
};

enableValidation();

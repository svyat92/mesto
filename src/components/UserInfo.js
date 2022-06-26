export class UserInfo {
  _userNameElement;
  _userDescElement;

  constructor({userNameSelector, userDescSelector}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescElement = document.querySelector(userDescSelector);
  }

  getInfoUser() {
    return {
      userName: this._userNameElement.textContent,
      userDesc: this._userDescElement.textContent
    }
  }

  setUserInfo({userName, userDesc}) {
    this._userNameElement.textContent = userName;
    this._userDescElement.textContent = userDesc;
  }

}

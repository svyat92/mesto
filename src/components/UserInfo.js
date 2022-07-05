export class UserInfo {
  _userNameElement;
  _userDescElement;
  _userAvatarElement;

  constructor({userNameSelector, userDescSelector, userAvatarSelector}) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescElement = document.querySelector(userDescSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
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
  
  setUserAvatar(url) {
    this._userAvatarElement.src = url;
  }

}

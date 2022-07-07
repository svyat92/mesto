export class UserInfo {
  _id;
  _userNameElement;
  _userDescElement;
  _userAvatarElement;

  constructor({ userNameSelector, userDescSelector, userAvatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescElement = document.querySelector(userDescSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getInfoUser() {
    return {
      userName: this._userNameElement.textContent,
      userDesc: this._userDescElement.textContent,
      avatar: this._userAvatarElement.src
    }
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._userNameElement.textContent = name;
    this._userDescElement.textContent = about;
    this._userAvatarElement.src = avatar;
    this._id = _id;
  }

}

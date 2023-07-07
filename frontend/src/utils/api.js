class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _getResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
    }).then((res) => this._getResult(res));
  }

  editUser({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._getResult(res));
  }

  editUserAvatar(avatarObj) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(avatarObj),
    }).then((res) => this._getResult(res));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include'
    }).then((res) => this._getResult(res));
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._getResult(res));
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => this._getResult(res));
  }

  toggleLikeStatus(cardId, isLiked) {
    return isLiked
      ? fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'PUT',
          credentials: 'include',
        }).then((res) => this._getResult(res))
      : fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'DELETE',
          credentials: 'include',
        }).then((res) => this._getResult(res));
  }
}

const api = new Api(
  'http://localhost:3001/api'
);

export default api;

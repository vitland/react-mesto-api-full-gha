const jwt = require('jsonwebtoken');
const { LoginError } = require('../errors/loginError');

const { SECRET } = require('../config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new LoginError('Нужна авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, SECRET);
  } catch (error) {
    throw new LoginError('Нужна авторизация');
  }
  req.user = payload;
  next();
};

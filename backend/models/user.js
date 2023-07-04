const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const { LoginError } = require('../errors/loginError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
    },
    about: { 
      type: String,
      default: 'Исследователь',
      minlength: [2, 'Минимальная длина поля "about" - 2'],
      maxlength: [30, 'Максимальная длина поля "about" - 30'],
    },
    avatar: {
      type: String,
      validate: {
        validator: (s) => validator.isURL(s),
        message: 'Некорректный URL',
      },
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      validate: {
        validator: (s) => validator.isEmail(s),
        message: 'Некорректный Email',
      },
      required: [true, 'Поле "email" должно быть заполнено'],
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email })
          .select('+password')
          .then((user) => {
            if (!user) {
              throw new LoginError('Неправильные почта или пароль');
            }
            return bcrypt.compare(password, user.password).then((matched) => {
              if (!matched) {
                throw new LoginError('Неправильные почта или пароль');
              }
              return user;
            });
          });
      },
    },
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { signin } = require('../controllers/users');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  signin,
);
module.exports = router;

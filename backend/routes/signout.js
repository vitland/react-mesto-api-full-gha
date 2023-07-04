const router = require('express').Router();
const { signout } = require('../controllers/users');

router.get(
  '/',
  signout,
);
module.exports = router;

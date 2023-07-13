const router = require('express').Router();
const { signout } = require('../controllers/users');

router.delete(
  '/',
  signout,
);
module.exports = router;

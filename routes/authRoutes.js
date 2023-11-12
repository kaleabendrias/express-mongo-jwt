const {Router} = require('express');
const authController = require('../controller/authController')

const router = Router();

// auth login
router.get('/signin', authController.signin_get);
router.get('/signup', authController.signup_get);
router.post('/signin', authController.signin_post)
router.post('/signup', authController.signup_post)

module.exports = router;
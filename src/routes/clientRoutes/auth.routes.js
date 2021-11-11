const express = require('express')
const router = express.Router();

const authController = require('../../controllers/clientControllers/auth.controller')


router.get('/login',authController.renderClientLogin)
router.get('/signup', authController.renderClientSignup)
router.post('/customer/login', authController.LoginCustomer)
router.post('/customer/signup', authController.SignupCustomer)



module.exports = router
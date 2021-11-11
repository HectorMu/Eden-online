const express = require('express')
const router = express.Router()


const authController = require('../controllers/auth.controller')



router.get('/login',authController.renderLogin)
router.get('/signup', authController.renderSignUp)



router.post('/login', authController.Login)
router.post('/signup', authController.SignUp)
router.get('/logout',authController.LogOut)


module.exports = router;
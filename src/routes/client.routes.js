const express = require('express')
const router = express.Router();

const authController = require('../controllers/clientControllers/auth.controller')


router.get('/login',authController.renderClientLogin)




module.exports = router
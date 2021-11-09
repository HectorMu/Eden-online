const express = require('express')
const router = express.Router()



const systemAuthController = require('./../../controllers/systemControllers/auth.controller')

router.get('/system',systemAuthController.renderEmployeeLogin)
router.post('/system/login',systemAuthController.Login)
router.get('/system/logout',systemAuthController.LogOut)


module.exports = router;
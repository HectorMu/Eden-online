const express = require('express')
const router = express.Router()



const systemAuthController = require('./../../controllers/systemControllers/auth.controller')

router.get('/system',systemAuthController.renderEmployeeLogin)


module.exports = router;
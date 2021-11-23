const express = require('express')
const authMiddleware = require('../../middlewares/authMiddleware')
const router = express.Router()



const systemTradesmanController = require('./../../controllers/systemControllers/tradesman.controller')

router.get('/tradesman/dashboard', authMiddleware.isLoggedIn, authMiddleware.isTradesman, systemTradesmanController.renderTradesmanDashboard)


module.exports = router;
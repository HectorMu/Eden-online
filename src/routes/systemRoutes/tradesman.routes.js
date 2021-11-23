const express = require('express')
const authMiddleware = require('../../middlewares/authMiddleware')
const router = express.Router()



const systemTradesmanController = require('./../../controllers/systemControllers/tradesman.controller')


router.get('/tradesman/dashboard',systemTradesmanController.renderTradesmanDashboard)
router.get('/tradesman/orders', systemTradesmanController.renderTradesManOrders)


module.exports = router;
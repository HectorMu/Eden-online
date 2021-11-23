const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')


const systemBarmanController = require('./../../controllers/systemControllers/barman.controller')

router.get('/barman/dashboard', authMiddleware.isLoggedIn, authMiddleware.isBarman, systemBarmanController.renderBarmanDashboard)
router.get('/barman/orders', authMiddleware.isLoggedIn, authMiddleware.isBarman, systemBarmanController.renderBarmanOrders)


module.exports = router;
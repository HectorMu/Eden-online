const express = require('express')
const router = express.Router()



const systemBarmanController = require('./../../controllers/systemControllers/barman.controller')

router.get('/barman/dashboard',systemBarmanController.renderBarmanDashboard)
router.get('/barman/orders', systemBarmanController.renderBarmanOrders)


module.exports = router;
const express = require('express')
const router = express.Router();

const waiterControllersPath = '../../controllers/systemControllers/Waiter/'


const systemWaiterController = require(waiterControllersPath+'waiter.controller')
const systemOrdersController = require(waiterControllersPath+'orders.controller')


router.get('/waiter/dashboard',systemWaiterController.renderWaiterDashboard)
router.get('/waiter/orders', systemOrdersController.renderOrdersView)



module.exports = router;
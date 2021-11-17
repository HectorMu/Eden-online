const express = require('express')
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware')

const waiterControllersPath = '../../controllers/systemControllers/Waiter/'

const systemWaiterController = require(waiterControllersPath+'waiter.controller')
const systemOrdersController = require(waiterControllersPath+'orders.controller')


router.get('/waiter/dashboard', authMiddleware.isLoggedIn, authMiddleware.isWaiter, systemWaiterController.renderWaiterDashboard)
router.get('/waiter/orders', authMiddleware.isLoggedIn, authMiddleware.isWaiter, systemOrdersController.renderOrdersView)
router.post('/waiter/neworder', authMiddleware.isLoggedIn, authMiddleware.isWaiter, systemOrdersController.newOrder)





module.exports = router;
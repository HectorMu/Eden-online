const express = require('express')
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware')

const waiterControllersPath = '../../controllers/systemControllers/Waiter/'

const systemWaiterController = require(waiterControllersPath+'waiter.controller')
const systemOrdersController = require(waiterControllersPath+'orders.controller')


router.get('/waiter/dashboard', authMiddleware.isLoggedIn, authMiddleware.isWaiter, systemWaiterController.renderWaiterDashboard)
router.get('/waiter/orders', authMiddleware.isLoggedIn, authMiddleware.isWaiter, systemOrdersController.renderOrdersView)
router.post('/waiter/neworder', authMiddleware.isLoggedIn, authMiddleware.isWaiter, systemOrdersController.newOrder)
router.get('/waiter/sendorder/:id', authMiddleware.isLoggedIn, authMiddleware.isWaiter, systemOrdersController.sendOrderToChef)
router.get('/waiter/deleteorder/:id',authMiddleware.isLoggedIn, authMiddleware.isWaiter, systemOrdersController.deleteOrder)
router.get('/waiter/sendtocashier/:id/:total',authMiddleware.isLoggedIn, authMiddleware.isWaiter, systemOrdersController.sendToCashier)





module.exports = router;
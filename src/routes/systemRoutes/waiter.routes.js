const express = require('express')
const router = express.Router();

const waiterControllersPath = '../../controllers/systemControllers/Waiter/'

const systemWaiterController = require(waiterControllersPath+'waiter.controller')
const systemOrdersController = require(waiterControllersPath+'orders.controller')


router.get('/waiter/dashboard',systemWaiterController.renderWaiterDashboard)
router.get('/waiter/orders', systemOrdersController.renderOrdersView)

router.post('/waiter/neworder',systemOrdersController.newOrder)

router.post('/waiter/order/addproduct/:fk_pedidolocal',systemOrdersController.orderNewProduct)

router.get('/waiter/orders/deleteproduct/:num',systemOrdersController.deleteOrderProduct)



module.exports = router;
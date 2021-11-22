const express = require('express')
const router = express.Router();

const customerController = require('../../controllers/clientControllers/customer.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

router.get('/client/dashboard', authMiddleware.isLoggedIn, customerController.renderDashboard) 
router.get('/client/menu',authMiddleware.isLoggedIn, customerController.renderClientMenu)
router.get('/client/orders', authMiddleware.isLoggedIn, customerController.renderClientOrders)
router.get('/client/shoppingcart', authMiddleware.isLoggedIn, customerController.renderClientCart)

module.exports = router
const express = require('express')
const router = express.Router();

const customerController = require('../../controllers/clientControllers/customer.controller')
const authMiddleware = require('../../middlewares/authMiddleware')

router.get('/client/dashboard', authMiddleware.isLoggedIn, customerController.renderDashboard) 

module.exports = router
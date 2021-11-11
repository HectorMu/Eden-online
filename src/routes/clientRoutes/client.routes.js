const express = require('express')
const router = express.Router();

const customerController = require('../../controllers/clientControllers/customer.controller')

router.get('/client/profile', customerController.renderProfile)
router.get('/client/dashboard', customerController.renderDashboard)


module.exports = router
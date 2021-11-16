const express = require('express')
const router = express.Router();

const customerController = require('../../controllers/clientControllers/customer.controller')

router.get('/profile', customerController.renderProfile)
router.get('/client', customerController.renderDashboard)


router.post('/editprofile', customerController.editCustomer)

module.exports = router
const express = require('express')
const router = express.Router()



const systemWaiterController = require('./../../controllers/systemControllers/waiter.controller')

router.get('/waiter/dashboard',systemWaiterController.renderWaiterDashboard)


module.exports = router;
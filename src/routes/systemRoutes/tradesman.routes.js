const express = require('express')
const router = express.Router()



const systemTradesmanController = require('./../../controllers/systemControllers/tradesman.controller')

router.get('/tradesman/dashboard',systemTradesmanController.renderTradesmanDashboard)


module.exports = router;
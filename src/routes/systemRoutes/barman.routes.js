const express = require('express')
const router = express.Router()



const systemBarmanController = require('./../../controllers/systemControllers/barman.controller')

router.get('/barman/dashboard',systemBarmanController.renderBarmanDashboard)


module.exports = router;
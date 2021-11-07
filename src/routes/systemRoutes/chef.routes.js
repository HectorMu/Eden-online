const express = require('express')
const router = express.Router()



const systemChefController = require('./../../controllers/systemControllers/chef.controller')

router.get('/chef/dashboard',systemChefController.renderChefDashboard)


module.exports = router;
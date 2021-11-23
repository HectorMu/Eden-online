const express = require('express')
const authMiddleware = require('../../middlewares/authMiddleware')
const router = express.Router()



const systemChefController = require('./../../controllers/systemControllers/chef.controller')

router.get('/chef/dashboard', authMiddleware.isLoggedIn, authMiddleware.isChef, systemChefController.renderChefDashboard)
router.get('/chef/orders', authMiddleware.isLoggedIn, authMiddleware.isChef, systemChefController.renderChefOrdersView)

router.get('/chef/onlineorders', systemChefController.renderChefOnlineOrdersView)


module.exports = router;
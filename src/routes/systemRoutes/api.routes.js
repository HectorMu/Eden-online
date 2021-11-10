const express = require('express')
const router = express.Router()

const apiController = require('./../../controllers/systemControllers/Api/apiController')



router.get('/api/orderdetail/:id',apiController.getOrderDetail)




module.exports = router;
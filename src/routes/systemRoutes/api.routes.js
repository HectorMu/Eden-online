const express = require('express')
const router = express.Router()

const apiController = require('./../../controllers/systemControllers/Api/apiController')



router.get('/api/orderdetail/:id',apiController.getOrderDetail)
router.get('/api/getproducts',apiController.getProducts)
router.post('/api/order/addproduct/:fk_pedidolocal', apiController.orderNewProduct)





module.exports = router;
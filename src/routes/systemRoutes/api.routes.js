const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')

const apiController = require('./../../controllers/systemControllers/Api/apiController')



router.get('/api/orderdetail/:id', authMiddleware.isLoggedIn, authMiddleware.ApiIsWaiter, apiController.getWaiterOrderDetail)
router.get('/api/chef/orderdetail/:id', authMiddleware.isLoggedIn, apiController.getChefOrderDetail)
router.get('/api/getproducts', authMiddleware.isLoggedIn, authMiddleware.isWaiter, apiController.getProducts)
router.post('/api/order/addproduct/:fk_pedidolocal', authMiddleware.isLoggedIn, authMiddleware.isWaiter, apiController.orderNewProduct)
router.get('/api/order/removeproduct/:num',authMiddleware.isLoggedIn, authMiddleware.isWaiter, apiController.deleteOrderProduct)
router.post('/api/order/changecuantity/:num',authMiddleware.isLoggedIn, authMiddleware.isWaiter, apiController.changeCuantityProduct)

router.get('/api/sendorder/:id',authMiddleware.isLoggedIn, authMiddleware.isWaiter, apiController.sendOrderToChef)





module.exports = router;
const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')

const apiController = require('./../../controllers/systemControllers/Api/apiController')

//global
router.get('/api/getproducts', authMiddleware.isLoggedIn, authMiddleware.isWaiter, apiController.getProducts)

//waiter routes
router.post('/api/order/addproduct/:fk_pedidolocal', authMiddleware.isLoggedIn, authMiddleware.isWaiter, apiController.orderNewProduct)
router.get('/api/order/removeproduct/:num',authMiddleware.isLoggedIn, authMiddleware.isWaiter, apiController.deleteOrderProduct)
router.post('/api/order/changecuantity/:num',authMiddleware.isLoggedIn, authMiddleware.isWaiter, apiController.changeCuantityProduct)
router.get('/api/sendorder/:id',authMiddleware.isLoggedIn, authMiddleware.isWaiter, apiController.sendOrderToChef)
router.get('/api/orderdetail/:id', authMiddleware.isLoggedIn, authMiddleware.ApiIsWaiter, apiController.getWaiterOrderDetail)

//chef routes
router.get('/api/chef/orderdetail/:id', authMiddleware.isLoggedIn, apiController.getChefLocalOrderDetail)
router.get('/api/chef/finishorder/:id', authMiddleware.isLoggedIn, apiController.chefFinishLocalOrder)
router.get('/api/chef/online/orderdetail/:id', authMiddleware.isLoggedIn, apiController.getChefOnlineOrderDetail)
router.get('/api/chef/online/finishorder/:id', authMiddleware.isLoggedIn, apiController.chefFinishOnlineOrder)

//barman
router.get('/api/barman/orderdetail/:id', authMiddleware.isLoggedIn, apiController.getBarmanLocalOrderDetail)
router.get('/api/barman/finishorder/:id', authMiddleware.isLoggedIn, apiController.barmanFinishLocalOrder)
router.get('/api/barman/online/orderdetail/:id', authMiddleware.isLoggedIn, apiController.getBarmanOnlineOrderDetail)
router.get('/api/barman/online/finishorder/:id', authMiddleware.isLoggedIn, apiController.barmanFinishOnlineOrder)


//client
router.get('/api/client/addtocar/:productid/:cuantity',apiController.ClientAddProductToOrder)
router.get('/api/getclientproducts', authMiddleware.isLoggedIn, apiController.getClientProducts)
router.get('/api/client/changecuantity/:num/:cuantity', authMiddleware.isLoggedIn, apiController.clientChangeProductCuantity)
router.get('/api/client/remove/:num', authMiddleware.isLoggedIn, apiController.clientRemoveProductFromOrder)
router.get('/api/client/confirmorder',authMiddleware.isLoggedIn, apiController.clientConfirmOrder)
router.get('/api/client/getOrders', authMiddleware.isLoggedIn, apiController.clientGetAllOrders)
router.get('/api/client/getorderDetail/:id', authMiddleware.isLoggedIn, apiController.getClientDetailOrder)


//tradesman
router.get('/api/tradesman/prepareorders',authMiddleware.isLoggedIn, apiController.TradesmanGetPreparedOrders)
router.get('/api/tradesman/getdetail/:id', authMiddleware.isLoggedIn, apiController.TradesManGetDetails)
router.get('/api/tradesman/deliverorder/:id', authMiddleware.isLoggedIn, apiController.TradesmanDeliverOrder)
router.get('/api/tradesman/markdelivered/:id', authMiddleware.isLoggedIn, apiController.TradesmanMarkAsDelivered)


 

module.exports = router;
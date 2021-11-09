const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')

const adminControllersPath = './../../controllers/systemControllers/admin/'

const systemEmployeesController = require(adminControllersPath+'employees.controller')
const systemCostumersController = require(adminControllersPath+'costumers.controller')
const systemProductController = require('./../../controllers/systemControllers/admin/products.controller')
const systemAdminController = require(adminControllersPath+'admin.controller')

router.get('/admin/dashboard', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemAdminController.renderAdminDashboard)

router.get('/admin/employees', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemEmployeesController.renderEmployees)
router.post('/admin/saveemployee', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemEmployeesController.SaveEmplooyee)
router.post('/admin/editemployee/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin,  systemEmployeesController.editEmployee)
router.get('/admin/deleteemployee/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin,  systemEmployeesController.deleteEmployee)

router.get('/admin/customers', authMiddleware.isLoggedIn, authMiddleware.isAdmin,  systemCostumersController.renderCostumers)
router.post('/admin/savecustomer', authMiddleware.isLoggedIn, authMiddleware.isAdmin,  systemCostumersController.SaveCostumer)
router.post('/admin/editcustomer/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin,  systemCostumersController.editCostumer)
router.get('/admin/deletecustomer/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin,  systemCostumersController.deleteCostumer)

router.get('/admin/products', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemProductController.renderProducts)
router.post('/admin/saveproduct', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemProductController.SaveProduct)
router.post('/admin/editproduct/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemProductController.editProduct)
router.get('/admin/deleteproduct/:id', authMiddleware.isLoggedIn, authMiddleware.isAdmin, systemProductController.deleteProduct)

module.exports = router;
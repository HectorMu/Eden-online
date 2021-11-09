const express = require('express')
const router = express.Router()
const authMiddleware = require('../../middlewares/authMiddleware')

const adminControllersPath = './../../controllers/systemControllers/admin/'

const systemEmployeesController = require(adminControllersPath+'employees.controller')
const systemCostumersController = require(adminControllersPath+'costumers.controller')
const systemAdminController = require(adminControllersPath+'admin.controller')

router.get('/admin/dashboard', authMiddleware.isLoggedIn, systemAdminController.renderAdminDashboard)

router.get('/admin/employees', authMiddleware.isLoggedIn, systemEmployeesController.renderEmployees)
router.post('/admin/saveemployee', authMiddleware.isLoggedIn, systemEmployeesController.SaveEmplooyee)
router.post('/admin/editemployee/:id', authMiddleware.isLoggedIn,  systemEmployeesController.editEmployee)
router.get('/admin/deleteemployee/:id', authMiddleware.isLoggedIn,  systemEmployeesController.deleteEmployee)

router.get('/admin/costumers', authMiddleware.isLoggedIn,  systemCostumersController.renderCostumers)
router.post('/admin/savecostumer', authMiddleware.isLoggedIn,  systemCostumersController.SaveCostumer)
router.post('/admin/editcostumer/:id', authMiddleware.isLoggedIn,  systemCostumersController.editCostumer)
router.get('/admin/deletecostumer/:id', authMiddleware.isLoggedIn,  systemCostumersController.deleteCostumer)

module.exports = router;
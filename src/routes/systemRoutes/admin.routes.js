const express = require('express')
const router = express.Router()



const systemEmployeesController = require('./../../controllers/systemControllers/admin/employees.controller')
const systemCostumersController = require('./../../controllers/systemControllers/admin/costumers.controller')
const systemAdminController = require('./../../controllers/systemControllers/admin/admin.controller')

router.get('/admin/dashboard',systemAdminController.renderAdminDashboard)

router.get('/admin/employees',systemEmployeesController.renderEmployees)
router.post('/admin/saveemployee',systemEmployeesController.SaveEmplooyee)
router.post('/admin/editemployee/:id', systemEmployeesController.editEmployee)
router.get('/admin/deleteemployee/:id', systemEmployeesController.deleteEmployee)

router.get('/admin/costumers', systemCostumersController.renderCostumers)
router.post('/admin/savecostumer', systemCostumersController.SaveCostumer)
router.post('/admin/editcostumer/:id', systemCostumersController.editCostumer)
router.get('/admin/deletecostumer/:id', systemCostumersController.deleteCostumer)

module.exports = router;
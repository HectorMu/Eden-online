const express = require('express')
const router = express.Router()



const systemAdminController = require('./../../controllers/systemControllers/admin.controller')

router.get('/admin/dashboard',systemAdminController.renderAdminDashboard)
router.get('/admin/employees',systemAdminController.renderAdminEmployees)

router.post('/admin/saveemployee',systemAdminController.SaveEmplooyee)
router.get('/admin/deleteemployee/:id', systemAdminController.deleteEmployee)


module.exports = router;
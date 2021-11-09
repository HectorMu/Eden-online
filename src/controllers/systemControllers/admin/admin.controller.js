const controller = {}


 controller.renderAdminDashboard = (req, res)=>{
   //aqui mandamos un usuarios, no le hagan caso solo son pruebas
    res.render('system/admin/dashboard') 
 }


module.exports = controller
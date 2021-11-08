const controller = {}

let user = {
    name:'Pedro',
    rol: 2
}

 controller.renderAdminDashboard = (req, res)=>{
   //aqui mandamos un usuarios, no le hagan caso solo son pruebas
    res.render('system/admin/dashboard',{
        user
      }) 
 }


module.exports = controller
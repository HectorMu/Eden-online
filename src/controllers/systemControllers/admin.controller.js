 const connection = require('../../database')
 const helpers = require('../../helpers/helpers')
 const controller = {}
 const redirectPath = '/admin/employees'

 let message = "";

 let user = {
    name:'Pedro',
    rol: 2
}

 controller.renderAdminDashboard = (req, res)=>{
    res.render('system/admin/dashboard',{
        user
      }) 
 }

 controller.renderAdminEmployees = async (req, res)=>{
    const roles = await connection.query('select * from roles')
    const employees = await connection.query('select * from usuarios')
    res.render('system/admin/admin.employees.hbs',{
      roles, employees, message
    })
 }

 controller.SaveEmplooyee = async (req, res)=>{
    const {nombre, apellido,correo,contra, fk_rol} = req.body;
    const newEmployee = {nombre, apellido,correo,contra,fk_rol};
    newEmployee.contra = await helpers.encryptPassword(contra);
    try {
        await connection.query('insert into usuarios set ?',[newEmployee])
        message="Usuario guardado"
        res.redirect(redirectPath)
    } catch (error) {
      console.log(error)
    }
 }
 
 controller.editEmployee = async (req, res)=>{
   const { id } = req.params
   const { nombre, apellido,correo,contra, fk_rol } = req.body;
   const updatedEmployee = {nombre,apellido,correo,contra,fk_rol}
   updatedEmployee.contra = await helpers.encryptPassword(contra)
   try {
      await connection.query('update usuarios set ? where id = ?',[updatedEmployee,id])
      message="Usuario modificado"
      res.redirect(redirectPath)
   } catch (error) {
     console.log(error)
   }
 }

 controller.deleteEmployee = async (req, res)=>{
   const { id } = req.params;
   try {
     await connection.query('delete from usuarios where id = ?',[id])
     message="Usuario eliminado"
     res.redirect(redirectPath)
   } catch (error) {
     console.log(error)
   }
 }

 module.exports = controller
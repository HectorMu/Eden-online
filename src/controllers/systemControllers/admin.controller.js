 const connection = require('../../database')
 const helpers = require('../../helpers/helpers')
 const controller = {}
 //aqui ponemos la ruta donde vamos a estar redireccionando siempre que hagamos una accion, la guardo en
 //una constante para no tener que estarla escribiendo completa siempre, hagan lo mismo, pero sobre la ruta
 //que esten trabajando
 const redirectPath = '/admin/employees'
//aqui guardo los mensajes, esto se va a quitar cuando usemos mensajes flash, pero jala para testear.
 let message = "";

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

 controller.renderAdminEmployees = async (req, res)=>{
    const roles = await connection.query('select * from roles')
    const employees = await connection.query('select * from usuarios')
    //mandamos a renderizar todo lo que necesitamos al momento de cargar la vista empleados
    res.render('system/admin/admin.employees.hbs',{
      roles, employees, message
    })
 }

 controller.SaveEmplooyee = async (req, res)=>{
   //para guardar, destructuramos todo lo que nos manden del body
    const {nombre, apellido,correo,contra, fk_rol} = req.body;
    //creamos un nuevo objeto y le agregamos las propiedades que nos traemos del req.body
    const newEmployee = {nombre, apellido,correo,contra,fk_rol};
    //ahora, al objeto newEmployee y su atributo contraseña, lo cambiamos por el hash que nos traemos desde helpers,
    //le ponemos un await por que el hash toma tiempo
    newEmployee.contra = await helpers.encryptPassword(contra);
    try {
        //Aqui cree una funcion el helpers que me ayuda a definir si existe un usuario con ese email ya registrado
        //Retorna booleanos, si existe true, si no false, y el resultado lo guardo en una variable
        const validateEmail = await helpers.userExists(newEmployee.correo)
        if(validateEmail){ //si existe, que me mande un mensaje que ya existe y redirija a la misma pagina
          message="El email ya esta en uso por otro usuario."
          res.redirect(redirectPath)
        }else{ //si no existe, guardamos el usuario
          await connection.query('insert into usuarios set ?',[newEmployee])
          message="Usuario guardado"
          res.redirect(redirectPath)
        }
    }
    catch (error) 
    {
      //siempre hay que poner un trycatch, por si el servidor se callo o paso algo, y mandamos un mensaje
      console.log(error)
      message="Algo sucedio, intentalo de nuevo."
      res.redirect(redirectPath)
    }
 }
 
 controller.editEmployee = async (req, res)=>{
   //pues aqui ya saben
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
     message="Algo sucedio, intentalo de nuevo."
     res.redirect(redirectPath)
   }
 }

 controller.deleteEmployee = async (req, res)=>{
   //aqui tambien ya saben
   const { id } = req.params;
   try {
     await connection.query('delete from usuarios where id = ?',[id])
     message="Usuario eliminado"
     res.redirect(redirectPath)
   } catch (error) {
     console.log(error)
     message="Algo sucedio, intentalo de nuevo."
     res.redirect(redirectPath)
   }
 }

 module.exports = controller
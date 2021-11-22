const controller = {}
const connection = require('../../../database')


 controller.renderAdminDashboard = async(req, res)=>{
   //getting all sales
   let today = new Date()
   const fecha = today.toLocaleDateString("en-US")
   const GetLocalSalesToday  = await connection.query('select COUNT (*) as localsales from ventalocal where fecha = ?', [fecha])
   const localSalesToday = GetLocalSalesToday[0].localsales
   const GetOnlineSalesToday = await connection.query('select COUNT (*) as onlinesales from ventalinea where fecha = ?', [fecha]) 
   const onlineSalesToday = GetOnlineSalesToday[0].onlinesales
   const GetLocalSalesTotal = await connection.query('select COUNT (*) as localsales from ventalocal')
   const localSalesTotal = GetLocalSalesTotal[0].localsales
   const GetOnlineSalesTotal  = await connection.query('select COUNT (*) as onlinesales from ventalinea')
   const onlineSalesTotal = GetOnlineSalesTotal[0].onlinesales
   const totalSales = parseInt(localSalesTotal) + parseInt(onlineSalesTotal)
   console.log(localSalesToday)
   //getting customers
   const GetCustomers = await connection.query('select COUNT (*) as customers from usuarios where fk_rol = 6')
   const GetAdmins = await connection.query('select COUNT (*) as admins from usuarios where fk_rol = 1')
   const GetCocineros = await connection.query('select COUNT (*) as cocineros from usuarios where fk_rol = 2')
   const GetBartenders = await connection.query('select COUNT (*) as bartenders from usuarios where fk_rol = 3')
   const GetMeseros = await connection.query('select COUNT (*) as meseros from usuarios where fk_rol = 4')
   const GetRepartidores = await connection.query('select COUNT (*) as repartidores from usuarios where fk_rol = 5')
    res.render('system/admin/dashboard',{
      localSalesToday, onlineSalesToday, localSalesTotal, onlineSalesTotal, totalSales, 
      Customers: GetCustomers[0].customers, Admins: GetAdmins[0].admins, Cocineros: GetCocineros[0].cocineros,
      Bartenders: GetBartenders[0].bartenders, Meseros: GetMeseros[0].meseros, Repartidores: GetRepartidores[0].repartidores       
    }) 
 }


module.exports = controller
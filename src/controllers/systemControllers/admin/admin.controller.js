const controller = {}
const connection = require('../../../database')


 controller.renderAdminDashboard = async(req, res)=>{
   //getting all sales
   const GetLocalSales  = await connection.query('select COUNT (*) as localsales from ventalocal')
   const localSales = GetLocalSales[0].localsales
   const GetOnlineSales  = await connection.query('select COUNT (*) as onlinesales from ventalinea')
   const onlineSales = GetOnlineSales[0].onlinesales
   const totalSales = localSales + onlineSales;
   //getting customers
  //  const GetCustomers = await connection.query('select COUNT (*) as customers from clientes')
   const GetEmployees = await connection.query('select COUNT (*) as employees from usuarios')
    res.render('system/admin/dashboard',{
      localSales, onlineSales, totalSales, 
      // Customers: GetCustomers[0].customers,
      Employees: GetEmployees[0].employees
    }) 
 }


module.exports = controller
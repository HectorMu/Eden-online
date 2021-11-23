const connection = require("../../../database")

const controller = {}

controller.renderWaiterDashboard = async (req, res)=>{
    const orders = await connection.query(`select COUNT (*) as orders from pedidolocal where estatus = 'Sin pagar' || estatus='Preparacion' || estatus='Preparado'`)
    const orderspreparation = await connection.query(`select COUNT (*) as orders from pedidolocal where estatus='Preparacion'`)
    const ordersprepared = await connection.query(`select COUNT (*) as orders from pedidolocal where estatus='Preparado'`)
    const ordersbox = await connection.query(`select COUNT (*) as orders from pedidolocal where estatus='En cobro'`)
    res.render('system/waiter/dashboard', {
        Orders: orders[0].orders, Orderspreparation: orderspreparation[0].orders,
        Ordersprepared: ordersprepared[0].orders, Ordersbox: ordersbox[0].orders
    })
}


module.exports = controller
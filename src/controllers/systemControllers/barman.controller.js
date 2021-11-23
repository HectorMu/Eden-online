const connection = require('../../database')
const controller = {}

controller.renderBarmanDashboard = async (req, res)=>{
    const products = await connection.query(`select COUNT(pl.fk_producto) as products from productospedidolocal pl, productos p where p.fk_categoria = 1 && pl.estatus = 'Preparacion' && pl.fk_producto = p.id;`)
    res.render('system/barman/dashboard', {
        Products: products[0].products
    })
}
controller.renderBarmanOrders=(req, res)=>{
    res.render('system/barman/barman.orders.hbs')
}
module.exports = controller
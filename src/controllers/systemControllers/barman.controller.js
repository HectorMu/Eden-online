const connection = require('../../database')
const controller = {}

controller.renderBarmanDashboard = async (req, res)=>{
    const productslocals = await connection.query(`select COUNT(*) as products from productospedidolocal pl, productos p where p.fk_categoria = 1 && pl.estatus = 'Preparacion' && pl.fk_producto = p.id;`)
    const productsline = await connection.query(`select COUNT(*) as products from productospedidolinea pl, productos p where p.fk_categoria = 1 && pl.estatus = 'Preparacion' && pl.fk_producto = p.id;`)
    res.render('system/barman/dashboard', {
        Productslocals: productslocals[0].products, Productsline: productsline[0].products
    })
}
controller.renderBarmanOrders=(req, res)=>{
    res.render('system/barman/barman.orders.hbs')
}
controller.renderBarmanOnlineOrders = (req, res)=>{
    res.render('system/barman/barman.onlineorders.hbs')
}
module.exports = controller
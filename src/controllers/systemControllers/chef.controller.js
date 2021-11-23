const connection = require('../../database')
const controller = {}

controller.renderChefDashboard = async (req, res)=>{
    const productslocals = await connection.query(`select COUNT(*) as products from productospedidolocal pl, productos p where p.fk_categoria = 2 && pl.estatus = 'Preparacion' && pl.fk_producto = p.id;`)
    const productsline = await connection.query(`select COUNT(*) as products from productospedidolinea pl, productos p where p.fk_categoria = 2 && pl.estatus = 'Preparacion' && pl.fk_producto = p.id;`)
    res.render('system/chef/dashboard', {
        Productslocals: productslocals[0].products, Productsline: productsline[0].products
    })
}

controller.renderChefOrdersView = (req, res) =>{
    res.render('system/chef/chef.orders.hbs')
}
controller.renderChefOnlineOrdersView = (req, res)=>{
    res.render('system/chef/chef.onlineorders.hbs')
}


module.exports = controller
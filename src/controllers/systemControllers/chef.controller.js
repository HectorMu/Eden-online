const connection = require('../../database')
const controller = {}

controller.renderChefDashboard = async (req, res)=>{
    const products = await connection.query(`select COUNT(pl.fk_producto) as products from productospedidolocal pl, productos p where p.fk_categoria = 2 && pl.estatus = 'Preparacion' && pl.fk_producto = p.id;`)
    res.render('system/chef/dashboard', {
        Products: products[0].products
    })
}

controller.renderChefOrdersView = (req, res) =>{
    res.render('system/chef/chef.orders.hbs')
}


module.exports = controller
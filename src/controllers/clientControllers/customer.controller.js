const passport = require('passport')
const connection = require('../../database');
const helpers = require('../../helpers/helpers');
const controller = {}
 

controller.renderDashboard = async (req, res) => {
    const orders = await connection.query(`select COUNT(*) as orders from pedidolinea where fk_cliente = ${req.user.id};`)    
    res.render('client/dashboard.hbs', {
        Orders: orders[0].orders
    })
}

controller.renderClientMenu = (req, res)=>{
    res.render('client/client.menu.hbs')
}

controller.renderClientOrders = (req, res)=>{
    res.render('client/client.orders.hbs')
}

controller.renderClientCart = (req, res)=>{
    res.render('client/client.cart.hbs')
}


module.exports  = controller
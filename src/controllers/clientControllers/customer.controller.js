const passport = require('passport')
const connection = require('../../database');
const helpers = require('../../helpers/helpers');
const controller = {}
 

controller.renderDashboard = (req, res) => {
    res.render('client/dashboard.hbs')
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
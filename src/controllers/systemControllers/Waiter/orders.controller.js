const controller = {}
const connection = require('../../../database');

controller.renderOrdersView = async (req, res)=>{
    const orders = await connection.query('select * from pedidolocal')
    res.render('system/waiter/waiter.orders.hbs',{
        orders
    })
}

module.exports = controller;
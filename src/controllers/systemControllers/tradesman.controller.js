const controller = {}

controller.renderTradesmanDashboard = (req, res)=>{
    res.render('system/tradesman/dashboard')
}

controller.renderTradesManOrders = (req, res)=>{
    res.render('system/tradesman/tradesman.orders.hbs')
}


module.exports = controller
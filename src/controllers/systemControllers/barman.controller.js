const controller = {}

controller.renderBarmanDashboard = (req, res)=>{
    res.render('system/barman/dashboard')
}
controller.renderBarmanOrders=(req, res)=>{
    res.render('system/barman/barman.orders.hbs')
}
controller.renderBarmanOnlineOrders = (req, res)=>{
    res.render('system/barman/barman.onlineorders.hbs')
}
module.exports = controller
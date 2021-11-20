const controller = {}

controller.renderBarmanDashboard = (req, res)=>{
    res.render('system/barman/dashboard')
}
controller.renderBarmanOrders=(req, res)=>{
    res.render('system/barman/barman.orders.hbs')
}
module.exports = controller
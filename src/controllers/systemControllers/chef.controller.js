const controller = {}

controller.renderChefDashboard = (req, res)=>{
    res.render('system/chef/dashboard')
}

controller.renderChefOrdersView = (req, res) =>{
    res.render('system/chef/chef.orders.hbs')
}
controller.renderChefOnlineOrdersView = (req, res)=>{
    res.render('system/chef/chef.onlineorders.hbs')
}


module.exports = controller
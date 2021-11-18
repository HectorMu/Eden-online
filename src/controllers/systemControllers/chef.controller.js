const controller = {}

controller.renderChefDashboard = (req, res)=>{
    res.render('system/chef/dashboard')
}

controller.renderChefOrdersView = (req, res) =>{
    res.render('system/chef/chef.orders.hbs')
}


module.exports = controller
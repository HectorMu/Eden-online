const passport = require('passport')
const connection = require('../../database');
const helpers = require('../../helpers/helpers');
const controller = {}
 

controller.renderDashboard = (req, res) => {
    res.render('client/dashboard.hbs')
}


module.exports  = controller
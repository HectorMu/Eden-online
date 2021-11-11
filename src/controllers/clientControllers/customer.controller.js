const passport = require('passport')
const connection = require('../../database')
const helpers = require('../../helpers/helpers')
const controller = {}

controller.renderProfile = (req, res) => {
    res.render('client/profile')
}

controller.renderDashboard = (req, res) => {
    res.render('client/dashboard')
}

  module.exports  = controller
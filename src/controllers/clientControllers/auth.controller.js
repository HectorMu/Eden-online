const passport = require('passport')
const connection = require('../../database')
const helpers = require('../../helpers/helpers')
const controller = {}

controller.renderClientLogin =(req, res) =>{
    res.render('client/auth/login')
}

controller.renderClientSignup = (req, res) => {
    res.render('client/auth/signup')
}

controller.LoginCustomer = (req, res) => {
    passport.authenticate('customer/local.login', {
        successRedirect: '/client/dashboard',
        failureRedirect: '/signup',
        failureFlash: true
    })
}

controller.SignupCustomer = (req, res) => {    
    passport.authenticate('customer/local.signup', {
        successRedirect: '/client/dashboard',
        failureRedirect: '/signup',
        failureFlash: true
    })
    // res.redirect('/client/dashboard')
}

module.exports  = controller
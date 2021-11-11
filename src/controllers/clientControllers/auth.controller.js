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

controller.LoginCustomer = passport.authenticate('customer/local.login', {
        successRedirect: '/client/dashboard',
        failureRedirect: '/signup',
        failureFlash: true
    })

controller.SignupCustomer = passport.authenticate('customer/local.signup', {
        successRedirect: '/client/dashboard',
        failureRedirect: '/signup',
        failureFlash: true
    })

controller.logOutCustomer = (req, res, next)=>{
    req.logOut()
    res.redirect('/login')
}


module.exports  = controller
const controller = {}
const passport = require('passport')

controller.renderLogin = (req, res)=>{
    res.render('auth/login.hbs')
}
controller.renderSignUp = (req, res)=>{
    res.render('auth/signup.hbs')
}

controller.Login =(req, res, next) =>{
    passport.authenticate('local.login',(err, user)=>{
        if(!user){
            return res.redirect('/system')
        }
        req.logIn(user,(err)=>{
            console.log(user)
            if(user.fk_rol == 1){
                return res.redirect('/admin/dashboard')
            }
            if(user.fk_rol == 2){
                return res.redirect('/chef/dashboard')
            }
            if(user.fk_rol == 3){
                return res.redirect('/barman/dashboard')
            }
            if(user.fk_rol == 4){
                return res.redirect('/waiter/dashboard')
            }
            if(user.fk_rol == 5){
                return res.redirect('/tradesman/dashboard')
            }
            if(user.fk_rol == 6){
                return res.redirect('/client/dashboard')
            }
        })
    })(req, res, next)
}


controller.SignUp = passport.authenticate('local.signup',{
        successRedirect: '/client/dashboard',
        failureRedirect: '/signup',
        failureFlash: true
})


controller.LogOut = (req, res,next)=>{
    req.logOut()
    res.redirect('/login')
}



module.exports = controller
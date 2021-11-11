const controller = {}
const passport = require('passport')

controller.renderEmployeeLogin = (req, res)=>{
    res.render('system/auth/login')
}
controller.Login =(req, res, next) =>{
    passport.authenticate('system/local.login',(err, user)=>{
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
        })
    })(req, res, next)
}

controller.LogOut = (req, res,next)=>{
    req.logOut()
    res.redirect('/system')
}



module.exports = controller
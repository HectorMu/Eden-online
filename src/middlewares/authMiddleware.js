const authMiddleware = {}
const helpers = require('../helpers/helpers')


authMiddleware.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg','Debes autenticarte para acceder a esta vista') 
    res.redirect('/system')
}

authMiddleware.isAdmin = (req, res, next)=>{
    if(req.user.fk_rol === 1){
        return next();
    }
    req.flash('error_msg','Solo los administradores pueden acceder a este modulo')
    res.redirect(helpers.redirectByUserRol(req.user.fk_rol))
}
authMiddleware.isChef = (req, res, next)=>{
    if(req.user.fk_rol === 2){
        return next();
    }
    req.flash('error_msg','Solo los chefs pueden acceder a este modulo.')
    res.redirect(helpers.redirectByUserRol(req.user.fk_rol))
}







module.exports = authMiddleware;
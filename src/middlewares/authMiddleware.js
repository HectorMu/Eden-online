const authMiddleware = {}
const helpers = require('../helpers/helpers')


authMiddleware.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg','Inicia sesión para acceder.') 
    res.redirect('/login')
}

authMiddleware.isAdmin = (req, res, next)=>{
    if(req.user.fk_rol === 1){
        return next();
    }
    req.flash('error_msg','Solo los administradores pueden acceder a este modulo')
    res.redirect(helpers.redirectByUserRol(req.user.fk_rol))
}
authMiddleware.isWaiter = (req, res,next)=>{
    if(req.user.fk_rol === 1 || req.user.fk_rol === 4){
        return next();
    }
    req.flash('error_msg','Solo los meseros pueden acceder a este modulo.')
    res.redirect(helpers.redirectByUserRol(req.user.fk_rol))
}
authMiddleware.ApiIsWaiter = (req, res, next)=>{
    if(req.user.fk_rol === 1 || req.user.fk_rol === 4){
        return next();
    }
    res.json({estatus: "permissions denied"})
}
authMiddleware.isChef = (req, res, next)=>{
    if(req.user.fk_rol === 1 || req.user.fk_rol === 2){
        return next();
    }
    req.flash('error_msg','Solo los chefs pueden acceder a este modulo.')
    res.redirect(helpers.redirectByUserRol(req.user.fk_rol))
}
authMiddleware.isBarman = (req, res, next)=>{
    if(req.user.fk_rol === 1 || req.user.fk_rol === 3){
        return next();
    }
    req.flash('error_msg','Solo los barman pueden acceder a este modulo.')
    res.redirect(helpers.redirectByUserRol(req.user.fk_rol))
}


module.exports = authMiddleware;
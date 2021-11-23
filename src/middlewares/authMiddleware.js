const authMiddleware = {}
const helpers = require('../helpers/helpers')


authMiddleware.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg','Inicia sesión para poder acceder.') 
    res.redirect('/login')
}

authMiddleware.isAdmin = (req, res, next)=>{
    if(req.user.fk_rol === 1){
        return next();
    }
    req.flash('error_msg','Solo los administradores tienen acceso a este modulo')
    res.redirect(helpers.redirectByUserRol(req.user.fk_rol))
}
authMiddleware.isWaiter = (req, res,next)=>{
    if(req.user.fk_rol === 1 || req.user.fk_rol === 4 || req.user.fk_rol == 6){
        return next();
    }
    req.flash('error_msg','Solo los meseros tienen acceso a este modulo.')
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
    req.flash('error_msg','Solo los chefs tienen acceso a este modulo.')
    res.redirect(helpers.redirectByUserRol(req.user.fk_rol))
}
authMiddleware.isBarman = (req, res, next)=>{
    if(req.user.fk_rol === 1 || req.user.fk_rol === 3){
        return next();
    }
    req.flash('error_msg','Solo los barman pueden acceder a este modulo.')
    res.redirect(helpers.redirectByUserRol(req.user.fk_rol))
}
authMiddleware.isTradesman = (req, res, next)=>{
    if(req.user.fk_rol === 1 || req.user.fk_rol === 5){
        return next();
    }
    req.flash('error_msg','Solo los repartidores pueden acceder a este modulo.')
    res.redirect(helpers.redirectByUserRol(req.user.fk_rol))
}


module.exports = authMiddleware;
const authMiddleware = {}


authMiddleware.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg','Debes autenticarte para acceder a esta vista') 
    res.redirect('/system')
}








module.exports = authMiddleware;
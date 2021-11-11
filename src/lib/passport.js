const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const helpers = require('../helpers/helpers')
const connection = require('../database')


passport.use('system/local.login',new passportLocal({
    usernameField:"correo",
    passwordField:"contra",
    passReqToCallback: true,
}, async(req, correo, contra, done)=>{
    const rows = await connection.query("select * from usuarios where correo = ?",[correo])
    if(rows.length >0){
        const user = rows[0]
        const validPass = await helpers.matchPassword(contra, user.contra)
        if(validPass){
            done(null, user,req.flash("success_msg", `Bienvenido ${user.nombre}`))
        }else{
            done(null, false, req.flash("error_msg", "Informacion incorrecta, intentalo de nuevo."))
        }
    }else{
        return done(null, false,req.flash("error_msg", "Informacion incorrecta, intentalo de nuevo."))
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

  passport.deserializeUser(async(id, done)=>{
      const rows = await connection.query("select * from usuarios where id = ?",[id])
      done(null, rows[0])
  })
const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const helpers = require('../helpers/helpers')
const connection = require('../database')


passport.use('local.login',new passportLocal({
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


passport.use('local.signup', new passportLocal({
    usernameField: 'correo',
    passwordField: 'contra',
    passReqToCallback: true
}, async (req, correo, contra, done) => {
    const exists = await helpers.userExists(correo)
    if(!exists){
        const { nombre, apellido, telefono, direccion } = req.body
        const newCustomer = {
            nombre,
            apellido,
            correo,
            telefono,
            direccion,
            contra,
            fk_rol: 6
        }
        newCustomer.contra = await helpers.encryptPassword(contra)
        const result = await connection.query('insert into usuarios set ?', [newCustomer])
        req.flash("success_msg", "Cuenta registrada correctamente.")
        newCustomer.id = result.insertId
        return done(null, newCustomer)
    }else{
        return done(null,false,req.flash("error_msg", "Ese correo electrónico ya esta registrado, prueba otro."))
    }
   
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

  passport.deserializeUser(async(id, done)=>{
      const rows = await connection.query("select * from usuarios where id = ?",[id])
      const user = rows[0]
      done(null, user)
  })

const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const helpers = require('../helpers/helpers')
const connection = require('../database')

passport.use('customer/local.login', new passportLocal({
    usernameField: "correo",
    passwordField: "contra",
    passReqToCallback: true,
}, async (req, correo, contra, done) => {
    const rows = await connection.query('select * from clientes where correo = ?', [correo])
    if (rows.length > 0) {
        const customer = rows[0]
        const validPass = await helpers.matchPassword(contra, customer.contra)
        if (validPass) {
            done(null, customer, req.flash("success_msg", `Bienvenido ${customer.nombre}`))
        } else {
            done(null, false, req.flash("error_msg", "Informacion incorrecta, intentalo de nuevo."))
        }
    }else{
        return done(null, false, req.flash("error_msg", "Informacion incorrecta, intentalo de nuevo."))
    }
}))

passport.use('customer/local.signup', new passportLocal({
    usernameField: 'correo',
    passwordField: 'contra',
    passReqToCallback: true
}, async (req, correo, contra, done) => {
    const { nombre, apellido, telefono, direccion } = req.body
    const newCustomer = {
        nombre,
        apellido,
        correo,
        telefono,
        direccion,
        contra
    }
    newCustomer.contra = await helpers.encryptPassword(contra)
    const result = await connection.query('insert into clientes set ?', [newCustomer])
    req.flash("success_msg", "Cuenta registrada correctamente.")
    newCustomer.id = result.insertId
    return done(null, newCustomer)
}))

passport.serializeUser((customer, done) => {
    done(null, customer.id)
})

passport.deserializeUser(async (id, done) => {
    const rows = await connection.query('select * from clientes where id = ?', [id])
    done(null, rows[0]);
})
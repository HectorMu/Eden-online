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
            done(null, user)
        }else{
            done(null, false, req.flash("error_msg", "Informacion incorrecta, intentalo de nuevo."))
        }
    }else{
        return done(null, false,req.flash("error_msg", "Informacion incorrecta, intentalo de nuevo."))
    }
}))



// passport.use('signup', new passportLocal({
//     usernameField: "email",
//     passwordField: "pass",
//     passReqToCallback: true,
// }, async(req, email, pass,  done)=>{
//     const verifiymail = await Dbpool.query("select * from users where email = ?",[email])
//     if(verifiymail.length==0){
//         if(pass.length>=8){     
//             const {firstname, lastname} = req.body
//             const privileges = "user"
//             const startscreen = "profile"
//             console.log(req.body)
//             let newUser = {
//                 firstname,
//                 lastname,
//                 email,
//                 pass,
//                 privileges,
//                 startscreen
//             }
//             newUser.pass = await helpers.encryptPass(pass);
//             //saving the user in the db
//             const result = await Dbpool.query("INSERT INTO users set ?", newUser)
//             newUser.iduser = result.insertId;
//             return done(null, newUser)
            
//     }else{
//         return done(null, false,req.flash("error_msg", "Password wasn't 8 caracters length. Try again"))
//     }
       
//     }else{
//         return done(null, false,req.flash("error_msg", "That email is already in use. Try another email"))
//     }
   
// }))
passport.serializeUser((user, done) => {
    done(null, user.id);
});

  passport.deserializeUser(async(id, done)=>{
      const rows = await connection.query("select * from usuarios where id = ?",[id])
      done(null, rows[0])
  })
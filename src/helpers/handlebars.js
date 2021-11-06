const exhbs = require('express-handlebars')

let hbs = exhbs.create({})

hbs.handlebars.registerHelper('isAdmin',(user)=>{
    return user.rol == 1 ? true : false
})


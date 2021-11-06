const exhbs = require('express-handlebars')

let hbs = exhbs.create({})

hbs.handlebars.registerHelper('isAdmin',(user)=>{
    // if(user.rol == 1){
    //     return true
    // }else{
    //     return false
    // }
    return user.rol == 1 ? true : false
})

hbs.handlebars.registerHelper('isWaiter',(user)=>{
    return user.rol == 2 ? true : false
})

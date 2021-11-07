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

hbs.handlebars.registerHelper('isData',(array)=>{
    return array.length > 0 ? true : false
})

hbs.handlebars.registerHelper('isMessage',(message)=>{
    return message.length > 0 ? true : false
})

hbs.handlebars.registerHelper('renderMessage',(message)=>{
    return message
})




hbs.handlebars.registerHelper('renderPrivileges',(rol)=>{
    if(rol === 1){
        return 'Administrador'
    }
    if(rol === 2){
        return 'Cocinero'
    }
    if(rol === 3){
        return 'Barman'
    }
    if(rol === 4){
        return 'Mesero'
    }
    if(rol === 5){
        return 'Repartidor'
    }
})

const exhbs = require('express-handlebars')

let hbs = exhbs.create({})

hbs.handlebars.registerHelper('isAdmin',(user)=>{
    // if(user.rol == 1){
    //     return true
    // }else{
    //     return false
    // }
    return user.fk_rol == 1 ? true : false
})

hbs.handlebars.registerHelper('isWaiter',(user)=>{
    return user.rol == 2 ? true : false
})

hbs.handlebars.registerHelper('isData',(array)=>{
    return array.length > 0 ? true : false
})
hbs.handlebars.registerHelper('redirectPrivileges',(rol)=>{
    if(rol === 1){
        return 'admin'
    }
    if(rol === 2){
        return 'chef'
    }
    if(rol === 3){
        return 'barman'
    }
    if(rol === 4){
        return 'waiter'
    }
    if(rol === 5){
        return 'tradesman'
    }
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
hbs.handlebars.registerHelper('renderCategory',(category)=>{
    if(category === 1){
        return 'Bebida'
    }
    if(category === 2){
        return 'Platillo'
    }
})

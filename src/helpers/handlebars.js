const exhbs = require('express-handlebars')
const connection = require('../database')

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
    return user.fk_rol == 4 ? true : false
})
hbs.handlebars.registerHelper('isClient',(user)=>{
    return user.fk_rol == 6 ? true : false
})
hbs.handlebars.registerHelper('hasRole',(user)=>{
     return user.fk_rol ? 'system' : 'customer';
})


hbs.handlebars.registerHelper('isData',(array)=>{
    return array.length > 0 ? true : false
})

hbs.handlebars.registerHelper('isMinor',(existencia) => {
    return existencia > 0 ? true : false
})
hbs.handlebars.registerHelper('redirectPrivileges',(rol)=>{
    if(rol){
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
    }else{
        return 'client'
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

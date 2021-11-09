const bcrypt = require('bcryptjs');
const connection = require('../database')

const helpers = {};

helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e)
    }
};

helpers.userExists = async (correo)=>{
    const exists = await connection.query(`select * from usuarios where correo like '%${correo}%'`)
    return exists.length >  0 ? true : false;
}

helpers.costumerExists = async (correo) => {
    const exists = await connection.query(`select * from clientes where correo like '%${correo}%'`)
    return exists.length > 0 ? true : false;
}

helpers.productExists = async (nombre)=>{
    const exist = await connection.query(`select * from productos where nombre like '%${nombre}%'`)
    return exist.length > 0 ? true : false;
}

helpers.redirectByUserRol = (rol)=>{
    if(rol == 2){
        return '/chef/dashboard'
    }
    if(rol == 3){
        return '/barman/dashboard'
    }
    if(rol == 4){
        return '/waiter/dashboard'
    }
    if(rol == 5){
        return '/tradesman/dashboard'
    }
}

module.exports = helpers;
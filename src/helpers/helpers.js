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


module.exports = helpers;
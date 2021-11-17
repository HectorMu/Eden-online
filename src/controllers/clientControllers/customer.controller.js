const passport = require('passport')
const connection = require('../../database');
const helpers = require('../../helpers/helpers');
const controller = {}

const redirectProfile = '/profile';


controller.renderProfile = (req, res) => {
    res.render('client/profile.hbs')
}

controller.renderDashboard = (req, res) => {
    res.render('client/dashboard.hbs')
}

controller.editCustomer = async (req, res) => {
    const id  = req.user.id;
    const { nombre, apellido, telefono, direccion, contra } = req.body;
    const updatedCustomer = { nombre, apellido, telefono, direccion, contra};
    updatedCustomer.contra = await helpers.encryptPassword(contra);
    try {
        await connection.query('update usuarios set nombre = ?, apellido = ?, telefono = ?, direccion = ?, contra = ? where id = ?', 
            [updatedCustomer.nombre, updatedCustomer.apellido, updatedCustomer.telefono, updatedCustomer.direccion, updatedCustomer.contra, id]);
        req.flash("success_msg", "Datos del cliente modificados correctamente.")
        res.redirect(redirectProfile);
    } catch (error) {
        console.log(error);
        req.flash("error_msg", "Algo sucedio, intentalo de nuevo.")
        res.redirect(redirectProfile);
    }
};

  module.exports  = controller
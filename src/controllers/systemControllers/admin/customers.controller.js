const connection = require('../../../database');
const helpers = require('../../../helpers/helpers');
const controller = {}

const redirectPath = '/admin/customers';


controller.renderCustomers = async (req, res) => {
    const customers = await connection.query('select * from clientes');
    res.render('system/admin/admin.customers.hbs', {
        customers
    });
};

controller.SaveCustomer = async (req, res) => {
    const {nombre, apellido, correo, telefono, direccion, contra} = req.body;
    const newCustomer = {nombre, apellido, correo, telefono, direccion, contra};

    newCustomer.contra = await helpers.encryptPassword(contra);
    try {
        const validateEmail = await helpers.customerExists(newCustomer.correo);
        if(validateEmail){
            req.flash("error_msg", "Este correo electronico ya esta registrado.")
            res.redirect(redirectPath);
        } else{
            await connection.query('insert into clientes set ?', [newCustomer]);
            req.flash("success_msg", "Cliente guardado correctamente.")
            res.redirect(redirectPath);
        }
    } catch (error) {
        console.log(error);
        req.flash("error_msg", "Algo sucedio, intentalo de nuevo.")
        res.redirect(redirectPath);
    }
};

controller.editCustomer = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, direccion, contra } = req.body;
    const updatedCustomer = { nombre, apellido, telefono, direccion, contra};
    updatedCustomer.contra = await helpers.encryptPassword(contra);
    try {
        await connection.query('update clientes set nombre = ?, apellido = ?, telefono = ?, direccion = ?, contra = ? where id = ?', 
            [updatedCustomer.nombre, updatedCustomer.apellido, updatedCustomer.telefono, updatedCustomer.direccion, updatedCustomer.contra, id]);
        req.flash("success_msg", "Datos del cliente modificados correctamente.")
        res.redirect(redirectPath);
    } catch (error) {
        console.log(error);
        req.flash("error_msg", "Algo sucedio, intentalo de nuevo.")
        res.redirect(redirectPath);
    }
};

controller.deleteCustomer = async (req, res) => {
    const { id } = req.params;
    try {
        await connection.query('delete from clientes where id = ?', [id]);
        req.flash("success_msg", "Cliente eliminado correctamente.")
        res.redirect(redirectPath);
    } catch (error) {
        console.log(error);
        req.flash("error_msg", "Algo sucedio, intentalo de nuevo.")
        res.redirect(redirectPath);
    }
};

module.exports = controller;
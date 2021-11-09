const connection = require('../../../database');
const helpers = require('../../../helpers/helpers');
const controller = {}

const redirectPath = '/admin/custumers';


controller.renderCostumers = async (req, res) => {
    const costumers = await connection.query('select * from clientes');
    res.render('system/admin/admin.costumers.hbs', {
        costumers
    });
};

controller.SaveCostumer = async (req, res) => {
    const {nombre, apellido, correo, telefono, direccion, contra} = req.body;
    const newCostumer = {nombre, apellido, correo, telefono, direccion, contra};

    newCostumer.contra = await helpers.encryptPassword(contra);
    try {
        const validateEmail = await helpers.costumerExists(newCostumer.correo);
        if(validateEmail){
            req.flash("error_msg", "Este correo electronico ya esta registrado.")
            res.redirect(redirectPath);
        } else{
            await connection.query('insert into clientes set ?', [newCostumer]);
            req.flash("success_msg", "Cliente guardado correctamente.")
            res.redirect(redirectPath);
        }
    } catch (error) {
        console.log(error);
        req.flash("error_msg", "Algo sucedio, intentalo de nuevo.")
        res.redirect(redirectPath);
    }
};

controller.editCostumer = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, telefono, direccion, contra } = req.body;
    const updatedCostumer = { nombre, apellido, correo, telefono, direccion, contra};
    updatedCostumer.contra = await helpers.encryptPassword(contra);
    try {
        await connection.query('update clientes set ? where id = ?', [updatedCostumer, id]);
        req.flash("success_msg", "Datos del cliente modificados correctamente.")
        res.redirect(redirectPath);
    } catch (error) {
        console.log(error);
        req.flash("error_msg", "Algo sucedio, intentalo de nuevo.")
        res.redirect(redirectPath);
    }
};

controller.deleteCostumer = async (req, res) => {
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
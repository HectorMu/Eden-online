const connection = require('../../../database');
const helpers = require('../../../helpers/helpers');
const controller = {}

const redirectPath = '/admin/tables'

controller.renderTables = async (req, res) => {
    const tables = await connection.query('select * from mesas');
    res.render('system/admin/admin.tables.hbs', {
        tables
    })
}

controller.SaveTable = async (req, res) => {
    const {mesa} = req.body;
    const newTable = {mesa}

    try {
        await connection.query('insert into mesas set ?', [newTable])
        req.flash("success_msg", "Mesa guardada correctamente.")
        res.redirect(redirectPath)
    } catch (error) {
        console.log(error)
        req.flash("error_msg", "Algo sucedio, intentalo de nuevo.")
        res.redirect(redirectPath)
    }
}

controller.deleteTable = async (req, res) => {
    const {id} = req.params
    try {
        await connection.query('delete from mesas where id = ?', [id])
        req.flash("success_msg", "Mesa eliminada correctamente.")
        res.redirect(redirectPath)
    } catch (error) {
        console.log(error)
        req.flash("error_msg", "Algo sucedio, intentalo de nuevo.")
        res.redirect(redirectPath)
    }
}

module.exports = controller
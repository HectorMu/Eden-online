const connection = require('../../../database');
const helpers = require('../../../helpers/helpers');
const controller = {}

const redirectPath = '/admin/costumers'

controller.renderTables = async (req, res) => {
    const tables = await connection.query('select * from mesas');
    res.render('system/admin/admin.tables.hbs', {
        tables
    })
}


module.exports = controller
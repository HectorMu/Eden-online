const connection = require('../../../database')

const controller = {}

controller.renderInventory = async (req, res) => {
    const inventory = await connection.query('select a.fk_producto, p.nombre, p.imagen, a.existencias from productos p, almacen a where p.id = a.fk_producto')
    res.render('system/admin/admin.inventory.hbs', {
        inventory
    })
}


module.exports = controller
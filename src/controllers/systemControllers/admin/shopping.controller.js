const connection = require('../../../database')
const controller = {}

const redirectPath = '/admin/shopping'

controller.renderShopping = async (req, res) => {
    const shopping = await connection.query('select e.id, p.nombre, e.fecha, e.cantidad, e.total from entradas e, productos p where p.id = e.fk_producto order by e.fecha desc')    
    res.render('system/admin/admin.shopping.hbs', {
        shopping
    })
}

controller.renderProductShopping = async (req, res) => {
    const products = await connection.query('select * from productos')
    res.render('components/adminComponents/shoppingModals/addProductShopping.hbs', {
        products
    })
}

controller.SaveShopping = async (req, res) => {    
    const { fk_producto, cantidad} = req.body

    const precio = await connection.query('select precio_compra from productos where id = ?', fk_producto)
    const total = parseInt(cantidad) * parseFloat(precio[0].precio_compra)

    let today = new Date()
    const fecha = today.toLocaleDateString("en-US")

    const stock = await connection.query('select existencias from almacen where fk_producto = ?', fk_producto)
    const existencias = parseInt(stock[0].existencias)+parseInt(cantidad)
    const newCompra = {fk_producto, fecha, cantidad, total}    
    try {
        await connection.query('insert into entradas set ?', [newCompra])
        await connection.query('update almacen set existencias = ? where fk_producto = ?', [existencias, fk_producto])     
        req.flash("success_msg", "Compra guardada correctamente.")
        res.redirect(redirectPath)
    } catch (error) {
        console.log(error)
        req.flash("error_msg", "Algo sucedió, inténtalo de nuevo.")
        res.redirect(redirectPath)
    }
}

controller.DeleteShopping = async (req, res) => {
    const { id } = req.params
    const cant = await connection.query('select fk_producto, cantidad from entradas where id = ?', [id])

    const stock = await connection.query('select existencias from almacen where fk_producto = ?', [cant[0].fk_producto])
    const existencias = parseInt(stock[0].existencias)-parseInt(cant[0].cantidad)
    try {
        await connection.query('delete from entradas where id = ?', [id])
        await connection.query('update almacen set existencias = ? where fk_producto = ?', [existencias, cant[0].fk_producto])
        req.flash("success_msg", "La compra fue eliminada con éxito.")
        res.redirect(redirectPath)
    } catch (error) {
        console.log(error)
        req.flash("error_msg", "Algo sucedió, inténtalo de nuevo.")
        res.redirect(redirectPath)
    }
}

module.exports = controller
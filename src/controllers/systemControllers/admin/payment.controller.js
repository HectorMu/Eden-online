const connection = require('../../../database')
const controller = {}

const redirectPath = '/admin/payment'

controller.renderPayment = async (req, res) => {
    const payment = await connection.query('select p.id, m.mesa, p.totalpedido from pedidolocal p, mesas m where p.fk_mesa = m.id and p.estatus = ?', 'En cobro')
    res.render('system/admin/admin.payment.hbs', {
        payment
    })
}

controller.renderDetailAccount = async (req, res) => {
    const { id } = req.params
    const detailaccount = await connection.query('select p.nombre, p.precio_venta, pl.cantidad from productos p, productospedidolocal pl where pl.fk_pedidolocal = ? and pl.fk_producto = p.id', [id])
    res.render('components/adminComponents/paymentModals/detailAccount.hbs', {
        detailaccount, id
    })
}

controller.SavePayment = async (req, res) => {
    const { id } = req.params
    let today = new Date()
    const fecha = today.toLocaleDateString("en-US")

    try {
        const productos = await connection.query('select fk_producto, cantidad from productospedidolocal where fk_pedidolocal = ?', [id])
        productos.forEach(async productopl => {
            const cantidadalmacen = await connection.query('select existencias from almacen where fk_producto = ?', [productopl.fk_producto])
            const operacion = parseInt(cantidadalmacen[0].existencias) - parseInt(productopl.cantidad)
            await connection.query('update almacen set existencias = ? where fk_producto = ?', [operacion, productopl.fk_producto])
        });
        await connection.query('insert into ventalocal values (null,?,?)', [fecha, id])
        await connection.query(`update pedidolocal set estatus = 'Cobrado' where id = ?`, [id])
        req.flash("success_msg", "La venta se realizó con éxito.")
        res.redirect(redirectPath)
    } catch (error) {
        console.log(error)
        req.flash("error_msg", "Algo sucedió, inténtalo de nuevo.")
        res.redirect(redirectPath)
    }
}

module.exports = controller
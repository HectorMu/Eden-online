const connection = require('../../../database')
const controller = {}

controller.renderPaymentscontrol = async (req, res) => {
    const paymentscontrol = await connection.query('select v.fecha, v.fk_pedidolocal, pl.totalpedido from ventalocal v, pedidolocal pl where pl.id = v.fk_pedidolocal')
    res.render('system/admin/admin.paymentscontrol.hbs', {
        paymentscontrol
    })
}

controller.renderDetailAccount = async (req, res) => {
    const { id } = req.params
    const detailaccount = await connection.query('select p.nombre, p.precio_venta, pl.cantidad from productos p, productospedidolocal pl where pl.fk_pedidolocal = ? and pl.fk_producto = p.id', [id])
    res.render('components/adminComponents/paymentscontrolModals/detailAccount.hbs', {
        detailaccount, id
    })
}


module.exports = controller
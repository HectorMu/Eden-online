const connection = require('../../../database')
const controller = {}

controller.renderPaymentslinecontrol = async (req, res) => {
    const paymentslinecontrol = await connection.query('select v.fecha, v.fk_pedidolinea, pl.totalpedido from ventalinea v, pedidolinea pl where pl.id = v.fk_pedidolinea')
    res.render('system/admin/admin.paymentslinecontrol.hbs', {
        paymentslinecontrol
    })
}

controller.renderDetailAccount = async (req, res) => {
    const { id } = req.params
    const detailaccount = await connection.query('select p.nombre, p.precio_venta, pl.cantidad from productos p, productospedidolinea pl where pl.fk_pedidolinea = ? and pl.fk_producto = p.id', [id])
    res.render('components/adminComponents/paymentslinecontrolModals/detailAccount.hbs', {
        detailaccount, id
    })
}


module.exports = controller
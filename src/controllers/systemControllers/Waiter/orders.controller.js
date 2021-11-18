const controller = {}
const connection = require('../../../database');
const redirectPath = '/waiter/orders'

controller.renderOrdersView = async (req, res)=>{
    const orders = await connection.query(`select * from pedidolocal where estatus = 'Sin pagar' || estatus='Preparacion' ORDER BY id DESC `)
    const tables = await connection.query('select * from mesas')
    const products = await connection.query('select * from productos')
    res.render('system/waiter/waiter.orders.hbs',{
        orders, tables, products 
    })
}

controller.newOrder = async (req, res)=>{
    const {fk_mesa} = req.body;
    try {
        await connection.query(`insert into pedidolocal values (null, ?,0,'Sin pagar')`,[fk_mesa])
        req.flash("success_msg", `Pedido para la mesa ${fk_mesa} generado correctamente.`)
        res.redirect(redirectPath)
        
    } catch (error) {
        req.flash("error_msg", "Algo paso, vuelve a intentarlo.")
        res.redirect(redirectPath)
        console.log(error)
    }
}
controller.deleteOrder = async(req, res)=>{
    const { id } = req.params;
    try {
        await connection.query(`delete from pedidolocal where id = ?`,[id])
        req.flash("success_msg", `Orden ${id} eliminada correctamente.`)
        res.redirect(redirectPath)
    } catch (error) {
        req.flash("error_msg", "Algo paso, vuelve a intentarlo.")
        res.redirect(redirectPath)
        console.log(error) 
    }
}
controller.sendToCashier = async(req, res)=>{
    const { id } = req.params;
    try {
        const orderTotal = await connection.query(`SELECT SUM (p.precio_venta*ppl.cantidad) AS Total, ppl.fk_pedidolocal FROM productospedidolocal ppl, productos p WHERE ppl.fk_pedidolocal = ${id} && ppl.fk_producto = p.id GROUP BY ppl.fk_pedidolocal;`)
        await connection.query(`update pedidolocal set estatus = 'En cobro', totalpedido = ? where id = ?`,[orderTotal[0].Total, id])
        req.flash("success_msg", `Pedido ${id} enviado para cobrar.`)
        res.redirect(redirectPath)
    } catch (error) {
        req.flash("error_msg", "Algo paso, vuelve a intentarlo.")
        res.redirect(redirectPath)
        console.log(error) 
        
    }
}



module.exports = controller;
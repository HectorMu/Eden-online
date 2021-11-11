const controller = {}
const connection = require('../../../database');
const redirectPath = '/waiter/orders'

controller.renderOrdersView = async (req, res)=>{
    const orders = await connection.query('select * from pedidolocal ORDER BY id DESC')
    const tables = await connection.query('select * from mesas')
    const products = await connection.query('select * from productos')
    res.render('system/waiter/waiter.orders.hbs',{
        orders, tables, products 
    })
}

controller.newOrder = async (req, res)=>{
    const {fk_mesa} = req.body;
    try {
        await connection.query(`insert into pedidolocal values (null, ?,0,'Captura')`,[fk_mesa])
        req.flash("success_msg", `Pedido para la mesa ${fk_mesa} generado correctamente.`)
        res.redirect(redirectPath)
        
    } catch (error) {
        req.flash("error_msg", "Algo paso, vuelve a intentarlo.")
        res.redirect(redirectPath)
        console.log(error)
    }
}

controller.orderNewProduct = async (req, res)=>{
    const {fk_pedidolocal} = req.params;
    const {fk_producto, cantidad} = req.body;
    const newProduct = {fk_pedidolocal,fk_producto,cantidad}

    try {
        await connection.query('insert into productospedidolocal set ?',[newProduct])
        req.flash("success_msg", `Producto para el pedido ${fk_pedidolocal} agregado correctamente.`)
        res.redirect(redirectPath)
    } catch (error) {
        req.flash("error_msg", "Algo paso, vuelve a intentarlo.")
        res.redirect(redirectPath)
        console.log(error)
        
    }
}
controller.deleteOrderProduct = async(req, res)=>{
    const {num} = req.params;
    try {
        await connection.query('delete from productospedidolocal where num = ?',[num])
        req.flash("success_msg", "Producto del pedido eliminado correctamente.")
        res.redirect(redirectPath)
    } catch (error) {
        req.flash("error_msg", "Algo paso, vuelve a intentarlo.")
        res.redirect(redirectPath)
        console.log(error)
    }
}

module.exports = controller;
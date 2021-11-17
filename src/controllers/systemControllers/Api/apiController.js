const controller = {}
const { json } = require('express');
const connection = require('../../../database')


controller.getOrderDetail = async(req, res)=>{
    const {id} = req.params;
    const orderProducts = await connection.query(`SELECT ppl.num, ppl.fk_pedidolocal, p.nombre,p.precio_venta,ppl.cantidad, (p.precio_venta*ppl.cantidad) AS total FROM productospedidolocal ppl, productos p 
    WHERE ppl.fk_pedidolocal = ${id} && ppl.fk_producto = p.id`)
    res.json(orderProducts)
}

controller.getProducts = async(req, res)=>{
    const products = await connection.query(`select * from productos`)
    res.json(products)
}

controller.orderNewProduct = async (req, res)=>{
    const {fk_pedidolocal} = req.params;
    const {fk_producto, cantidad} = req.body;
    const newProduct = {fk_pedidolocal,fk_producto,cantidad}

    try {
        await connection.query('insert into productospedidolocal set ?',[newProduct])
        res.json({estatus: "ok"})
    } catch (error) {
        res.json({estatus: "wrong"})
        console.log(error)  
    }
} 
controller.deleteOrderProduct = async(req, res)=>{
    const {num} = req.params;
    try {
        await connection.query('delete from productospedidolocal where num = ?',[num])
        res.json({status:"ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}

controller.changeCuantityProduct = async(req, res)=>{
    const {num} = req.params;
    const { cuantity }= req.body;
    try {
        await connection.query('update productospedidolocal set cantidad = ? where num = ?',[cuantity, num])
        res.json({status:"ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}



module.exports = controller;
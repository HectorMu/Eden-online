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



module.exports = controller;
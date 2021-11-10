const controller = {}
const { json } = require('express');
const connection = require('../../../database')


controller.getOrderDetail = async(req, res)=>{
    const {id} = req.params;
    const orderProducts = await connection.query(`SELECT ppl.fk_pedidolocal, p.nombre,ppl.cantidad FROM productospedidolocal ppl, productos p 
    WHERE ppl.fk_pedidolocal = ${id} && ppl.fk_producto = p.id`)
    res.json(orderProducts)
}


module.exports = controller;
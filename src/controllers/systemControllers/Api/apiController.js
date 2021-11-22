const controller = {}
const { json } = require('express');
const connection = require('../../../database')

/* global actions */
controller.getProducts = async(req, res)=>{
    const products = await connection.query(`select * from productos`)
    res.json(products)
}
/* /global actions */

/* waiter actions */
controller.getWaiterOrderDetail = async(req, res)=>{
    const {id} = req.params;
    const orderProducts = await connection.query(`SELECT ppl.num, ppl.fk_pedidolocal, p.nombre,p.precio_venta,ppl.cantidad, ppl.estatus, (p.precio_venta*ppl.cantidad) AS total FROM productospedidolocal ppl, productos p 
    WHERE ppl.fk_pedidolocal = ${id} && ppl.fk_producto = p.id`)
    res.json(orderProducts)
}
controller.orderNewProduct = async (req, res)=>{
    const {fk_pedidolocal} = req.params;
    const {fk_producto, cantidad} = req.body;
    const newProduct = {fk_pedidolocal,fk_producto,cantidad,estatus:'Captura'}

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
controller.sendOrderToChef = async (req, res)=>{
    const { id } = req.params;
    try {
        await connection.query(`update pedidolocal set estatus = 'Preparacion' where id = ? `,[id])
        await connection.query(`update productospedidolocal set estatus = 'Preparacion' where fk_pedidolocal = ? && estatus != 'Preparado'`,[id])
        res.json({status:"ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}

/* /waiter actions */

/* chef actions */
controller.chefFinishLocalOrder = async(req, res)=>{
    const {id}= req.params
    try {
        await connection.query(`update pedidolocal set estatus = 'Preparado' where id = ?`,[id])
        await connection.query(`update productospedidolocal ppl, productos p set ppl.estatus = 'Preparado' WHERE ppl.fk_pedidolocal = ? AND ppl.fk_producto = p.id && p.fk_categoria = 2;`,[id])
        res.json({status:"ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}
controller.getChefLocalOrderDetail = async(req, res)=>{
    const {id} = req.params;
    const orderProducts = await connection.query(`SELECT ppl.num, ppl.fk_pedidolocal, p.nombre,p.precio_venta,ppl.cantidad, ppl.estatus, (p.precio_venta*ppl.cantidad) AS total FROM productospedidolocal ppl, productos p 
    WHERE ppl.fk_pedidolocal = ${id} && ppl.fk_producto = p.id && ppl.estatus='Preparacion' && p.fk_categoria = 2;`)
    res.json(orderProducts)
}
/* /chef actions */

/* barman actions */
controller.barmanFinishLocalOrder = async(req, res)=>{
    const {id}= req.params
    try {
        await connection.query(`update pedidolocal set estatus = 'Preparado' where id = ?`,[id])
        await connection.query(`update productospedidolocal ppl, productos p set ppl.estatus = 'Preparado' WHERE ppl.fk_pedidolocal = ? AND ppl.fk_producto = p.id && p.fk_categoria = 1;`,[id])
        res.json({status:"ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}
controller.getBarmanLocalOrderDetail = async(req, res)=>{
    const {id} = req.params;
    const orderProducts = await connection.query(`SELECT ppl.num, ppl.fk_pedidolocal, p.nombre,p.precio_venta,ppl.cantidad, ppl.estatus, (p.precio_venta*ppl.cantidad) AS total FROM productospedidolocal ppl, productos p 
    WHERE ppl.fk_pedidolocal = ${id} && ppl.fk_producto = p.id && ppl.estatus='Preparacion' && p.fk_categoria = 1;`)
    res.json(orderProducts)
}
/* /barman actions */

//client api actions
controller.ClientAddProductToOrder = async(req, res)=>{
    const { productid, cuantity } = req.params;
    if(cuantity > 10){
        res.json({status: "cuantityExceding"})
        return
    }
    let fkPedido;
    try {
        const car = await connection.query(`select * from pedidolinea where fk_cliente = ? && estatus = 'Captura'`,[req.user.id])
        if(car.length > 0){
            fkPedido = car[0].id
            const productInCar = await connection.query(`select * from productospedidolinea where fk_producto = ? && fk_pedidolinea = ? && estatus = 'Captura'`,[productid,fkPedido])
            if(productInCar.length > 0){
                let currentCuantity = productInCar[0].cantidad;
                let newCuantity = parseFloat(currentCuantity)+parseFloat(cuantity)
                if(parseFloat(currentCuantity)+parseFloat(newCuantity) >= 10){
                    await connection.query(`update productospedidolinea set cantidad = 10 where fk_pedidolinea = ? && fk_producto = ?`,[fkPedido, productid])
                    res.json({status:"ok"})
                }else{
                    await connection.query(`update productospedidolinea set cantidad = ? where fk_pedidolinea = ? && fk_producto = ?`,[newCuantity,fkPedido, productid])
                    res.json({status:"ok"})
                }
                
            }else{
                await connection.query(`insert into productospedidolinea values(null, ?, ?,?,'Captura')`,[fkPedido,productid,cuantity])
                console.log("ya existe un carrito")
                res.json({status:"ok"})
            }
        }else{
            await connection.query(`insert into pedidolinea values (null, ?,0,'Captura')`, [req.user.id])
            const car = await connection.query(`select * from pedidolinea where fk_cliente = ? && estatus = 'Captura'`,[req.user.id])
            fkPedido = car[0].id
            await connection.query(`insert into productospedidolinea values(null, ?, ?,?,'Captura')`,[fkPedido,productid,cuantity])
            console.log("aun no existe un carrito, se creo")
            res.json({status:"ok"})
        }
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}
controller.getClientProducts = async(req, res)=>{
    try {
        const idPedido = await connection.query(`select id from pedidolinea where fk_cliente = ? && estatus = 'Captura'`,[req.user.id])
        if(idPedido){
            const clientProducts = await connection.query(`SELECT ppl.num, p.nombre, p.imagen, p.precio_venta, ppl.cantidad, (p.precio_venta*ppl.cantidad) AS total, ppl.estatus FROM productospedidolinea ppl, productos p WHERE p.id = ppl.fk_producto && ppl.fk_pedidolinea = ? && estatus = 'Captura'`,[idPedido[0].id])
            res.json(clientProducts)
        }else{
            res.json([])
        } 
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error) 
    }
}
controller.clientChangeProductCuantity = async(req, res)=>{
    const { num, cuantity } = req.params;
    try {
        const idPedido = await connection.query(`select id from pedidolinea where fk_cliente = ? && estatus = 'Captura'`,[req.user.id])
        await connection.query('update productospedidolinea set cantidad = ? where num = ? ',[cuantity, num])
        const cuantityChanged = await connection.query('select cantidad from productospedidolinea where num = ? && fk_pedidolinea = ?',[num,idPedido[0].id])
        res.json({status: "ok",cuantityChanged})

    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}
controller.clientRemoveProductFromOrder = async(req,res)=>{
    const {num} = req.params
    try {
        const idPedido = await connection.query(`select id from pedidolinea where fk_cliente = ? && estatus = 'Captura'`,[req.user.id])
        await connection.query('delete from productospedidolinea where num = ? && fk_pedidolinea = ?', [num,idPedido[0].id])
        res.json({status: "ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error)
    }
}

controller.clientConfirmOrder = async (req, res)=>{
    try {
        const idPedido = await connection.query(`select id from pedidolinea where fk_cliente = ? && estatus = 'Captura'`,[req.user.id])
        const pedidoTotal = await connection.query(`SELECT SUM(p.precio_venta*ppl.cantidad) AS Total FROM productospedidolinea ppl, productos p WHERE ppl.fk_pedidolinea = ? && p.id = ppl.fk_producto;`,[idPedido[0].id])
        await connection.query(`update pedidolinea set totalPedido = ?, estatus = 'Preparacion' where id = ?`,[pedidoTotal[0].Total,idPedido[0].id])
        await connection.query(`update productospedidolinea set estatus = 'Preparacion' where fk_pedidolinea = ?`,[idPedido[0].id])
        
        res.json({status: "ok"})
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error) 
    }
}

controller.clientGetAllOrders = async (req, res)=>{
    try {
        const clientOrders = await connection.query(`select * from pedidolinea where fk_cliente = ? && estatus != 'Captura'`,[req.user.id])
        res.json(clientOrders)
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error) 
    }
}
controller.getClientDetailOrder = async(req, res)=>{
    const {id} = req.params;
    try {
        const orderDetail = await connection.query(`SELECT ppl.num, p.nombre, p.imagen, p.precio_venta, ppl.cantidad, (p.precio_venta*ppl.cantidad) AS total, ppl.estatus FROM productospedidolinea ppl, productos p WHERE p.id = ppl.fk_producto && ppl.fk_pedidolinea = ?`,[id])
        res.json(orderDetail)
    } catch (error) {
        res.json({status: "wrong"})
        console.log(error) 
    }
}

module.exports = controller;
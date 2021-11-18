const socketIo = require('socket.io')
const connection = require('../database')

module.exports = (server)=>{
    const io = socketIo(server)
      //web sockets
    io.on('connection',(socket)=>{
    
    socket.on('clientChef:getAllOrders',async()=>{
        const orders = await connection.query(`select ppl.id, m.mesa, ppl.totalpedido, ppl.estatus from pedidolocal ppl, mesas m WHERE m.id = ppl.fk_mesa && estatus = 'Preparacion'`)
        io.emit('server:chefGetAllOrders',orders)
    })


    socket.on('clientWaiter:sendNewOrder',async()=>{
        const orders = await connection.query(`select ppl.id, m.mesa, ppl.totalpedido, ppl.estatus from pedidolocal ppl, mesas m WHERE m.id = ppl.fk_mesa && estatus = 'Preparacion'`)
        io.emit('server:waiterSendOrdersChef',orders)
    })


  
    socket.on('clientAdmin:notifyClient', ()=>{
        io.emit('server:notifyCustomer')
    })
    socket.on('clientAdmin:notifyWaiter',()=>{
        io.emit('server:notifyWaiter')
    })


    console.log('new connection', socket.id)
    }) 
}




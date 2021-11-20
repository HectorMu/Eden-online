const socketIo = require('socket.io')
const connection = require('../database')

module.exports = (server)=>{
    const io = socketIo(server)
      //web sockets
    io.on('connection',(socket)=>{

    //chef
    //render al chef orders
    socket.on('clientChef:getAllOrders',async()=>{
        const orders = await connection.query(`select ppl.id, m.mesa, ppl.totalpedido, ppl.estatus from pedidolocal ppl, mesas m WHERE m.id = ppl.fk_mesa && estatus = 'Preparacion'`)
        io.emit('server:chefGetAllOrders',orders)
    })
    //send new order to chef from waiter to add to chef orders view
    socket.on('clientWaiter:sendChefNewOrder',async(id)=>{
        console.log(id)
        const orders = await connection.query(`select ppl.id, m.mesa, ppl.totalpedido, ppl.estatus from pedidolocal ppl, mesas m WHERE m.id = ppl.fk_mesa && estatus = 'Preparacion'`)
        io.emit('server:waiterSendOrdersChef',orders, id)
    })
    //chef emits order finished and id of the order
    socket.on('clientChef:OrderFinished',(id)=>{
        io.emit('server:chefOrderFinished',id)
    })

    
    //render al barman orders
    socket.on('clientBarman:getAllOrders',async()=>{
        const orders = await connection.query(`select ppl.id, m.mesa, ppl.totalpedido, ppl.estatus from pedidolocal ppl, mesas m WHERE m.id = ppl.fk_mesa && estatus = 'Preparacion'`)
        io.emit('server:barmanGetAllOrders',orders)
    })
    //send new order to chef from waiter to add to chef orders view
    socket.on('clientWaiter:sendBarmanNewOrder',async(id)=>{
        console.log(id)
        const orders = await connection.query(`select ppl.id, m.mesa, ppl.totalpedido, ppl.estatus from pedidolocal ppl, mesas m WHERE m.id = ppl.fk_mesa && estatus = 'Preparacion'`)
        io.emit('server:waiterSendOrdersBarman',orders, id)
    })
    //chef emits order finished and id of the order
    socket.on('clientBarman:OrderFinished',(id)=>{
        io.emit('server:barmanOrderFinished',id)
    })








    //sockets for test
    socket.on('clientAdmin:notifyClient', ()=>{
        io.emit('server:notifyCustomer')
    })
    socket.on('clientAdmin:notifyWaiter',()=>{
        io.emit('server:notifyWaiter')
    })
    console.log('new connection', socket.id)
    }) 
}




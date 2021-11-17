const socketIo = require('socket.io')

module.exports = (server)=>{
    const io = socketIo(server)
    //web sockets
    io.on('connection',(socket)=>{

    socket.on('clientAdmin:notifyClient', ()=>{
        io.emit('server:notifyCustomer')
    })
    socket.on('clientAdmin:notifyWaiter',()=>{
        io.emit('server:notifyWaiter')
    })
    console.log('new connection', socket.id)
    })
}




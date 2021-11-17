socket.on('server:notifyWaiter',()=>{
    Push.create("Pedido listo!", {
        body: "Recoger nuevo pedido",
        icon: '/icon.png',
    })
})
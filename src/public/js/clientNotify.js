socket.on('server:notifyCustomer',()=>{
    Push.create("Nueva promocion!", {
        body: "Aprovecha nuestra promocion!",
        icon: '/icon.png',
    })
})

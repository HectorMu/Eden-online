const btnNotifyWaiter = document.getElementById('BtnNotifyWaiter')
const btnNotifyClient = document.getElementById('BtnNotifyClient')

btnNotifyWaiter.addEventListener('click',()=>{
    socket.emit('clientAdmin:notifyWaiter')
})

btnNotifyClient.addEventListener('click',()=>{
    socket.emit('clientAdmin:notifyClient')
})
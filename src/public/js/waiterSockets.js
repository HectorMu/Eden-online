socket.on('server:notifyWaiter',()=>{
    Push.create("Pedido listo!", {
        body: "Recoger nuevo pedido",
        icon: '/icon.png',
    })
})


const searchInput = document.getElementById('searchInput')
const buttons = document.querySelectorAll('.buttonorder')
const allCards = document.querySelectorAll('.card')
searchInput.addEventListener("keyup",()=>{
    for (let i = 0; i < buttons.length; i++) {
        if(searchInput.value=="" ||searchInput.value == null){
            buttons[i].classList.remove('d-none')
            allCards[i].classList.remove('d-none')
        }
        if(!buttons[i].textContent.includes(searchInput.value)){
            buttons[i].classList.add('d-none')
            allCards[i].classList.add('d-none')
        }  
    }
})

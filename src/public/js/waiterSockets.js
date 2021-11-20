socket.on('server:notifyWaiter',()=>{
    Push.create("Pedido listo!", {
        body: "Recoger nuevo pedido",
        icon: '/icon.png',
    })
})

socket.on('server:chefOrderFinished',(id)=>{
    Toastify({
        text: `Platillos de la orden ${id} listos para recoger.`,
        className: "info text-center mt-2 w-100 toast-font",
        position: "center",
        gravity:"top",
        style: {background: "#4e73df",}
    }).showToast();
})

socket.on('server:barmanOrderFinished',(id)=>{
    Toastify({
        text: `Bebidas de la orden ${id} listas para recoger.`,
        className: "info text-center mt-2 w-100 toast-font",
        position: "center",
        gravity:"top",
        style: {background: "#4e73df",}
    }).showToast();
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

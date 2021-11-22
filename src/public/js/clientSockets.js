
const carDropdown = document.getElementById('carDropdown')
const carListDiv = document.getElementById('carListDiv')
const carCounter = document.getElementById('carCounter')

socket.on('server:notifyCustomer', () => {
    Toastify({
        text: `Hola cliente`,
        className: "info text-center mt-2 w-100 toast-font",
        position: "center",
        gravity: "top",
        style: { background: "#4e73df", }
    }).showToast();
    Push.create("Nueva promocion!", {
        body: "Aprovecha nuestra promocion!",
        icon: '/icon.png',
    })
})
const Carspinner = () =>(`
<center>
     <div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
    </div>
</center>`)

const getClientCarProducts = async () => {
    const url = '/api/getclientproducts'
    const response = await fetch(url)
    const clientProducts = await response.json();
    return clientProducts
}




carDropdown.addEventListener("click", async () => {
    carListDiv.innerHTML = Carspinner()
    const clientProducts = await getClientCarProducts()
    if(clientProducts.length > 0){
        carListDiv.innerHTML =""
        carListDiv.innerHTML += ` <a class="dropdown-item text-center small text-gray-500" href="/client/shoppingcart">Mostrar mi carrito</a>`
        clientProducts.map(producto =>{
            carListDiv.innerHTML += `
            <a class="dropdown-item d-flex align-items-center" href="/client/shoppingcart">
                    <div class="mr-3">
                        <div class="icon-circle bg-primary">
                        <img class="img-thumbnail" src="${producto.imagen}" alt="">
                        </div>
                    </div>
                    <div>
                        <div class="small text-gray-500">${producto.nombre}</div>
                        <span class="font-weight-bold"> $${producto.precio_venta} - Cantidad: ${producto.cantidad > 10 ? '10' : producto.cantidad} - Total: $${producto.total}</span>
                     </div>
            </a> 
            `
        })
    }else{
        carListDiv.innerHTML =`<a class="dropdown-item text-center small text-gray-500">No tiene productos en su carrito.</a>`
    }
  
})


const createToast = (message, type)=>{
    if(type == "success"){
        Toastify({
            text: message,
            className: "info text-center mt-2 w-100 toast-font",
            position: "center",
            gravity:"top",
            style: {background: "#4e73df",}
        }).showToast();
    }
    if(type == "error"){
        Toastify({
            text: message,
            className: "info text-center mt-2 w-100 toast-font",
            position: "center",
            gravity:"top",
            style: {background: "red",}
        }).showToast()
    }
}


const updateCounter = async()=>{
    const productNumber = await getClientCarProducts();
    if(productNumber.status == "wrong"){
        carCounter.innerText = "0";
        return
    }
    if(productNumber !== undefined){
        if(productNumber.length > 4){
            carCounter.innerText = "4+";
        }else{
            carCounter.innerText = productNumber.length;
        } 
    }else{
        carCounter.innerText = "0";
    } 
}


updateCounter()

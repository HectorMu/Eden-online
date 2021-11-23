
const carDropdown = document.getElementById('carDropdown')
const carListDiv = document.getElementById('carListDiv')
const carCounter = document.getElementById('carCounter')

socket.on('server:notifyCustomer',(pedido)=>{
    createToast(`Tu pedido ${pedido} esta en entrega, ¡esperalo!`,"success")
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
        carListDiv.innerHTML =`<a href="/client/Menu" class="dropdown-item text-center small text-gray-500">Aún no tienes productos en tu carrito.</a>`
    }
  
})



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

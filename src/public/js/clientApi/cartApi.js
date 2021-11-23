const listProducts = document.getElementById('listCarProducts')
const totalH5 = document.getElementById('cartTotal')
const btnConfirmOrder = document.getElementById('BtnConfirmOrder')



let totalCart = 0

const updateProductCuantity = async(num, cuantity)=>{
    const url = `/api/client/changecuantity/${num}/${cuantity}`
    const response = await fetch(url)
    const cuantityChanged = await response.json();
    console.log(cuantityChanged)
    return cuantityChanged
}
const removeProduct = async (num)=>{
    const url = `/api/client/remove/${num}`
    const response = await fetch(url)
    return response.json();
}
const confirmOrder = async()=> {
    const url = '/api/client/confirmorder'
    const response = await fetch(url)
    return response.json();
}
const updateCartTotal = (total)=>{
    totalCart+= total;
}
const renderProducts = async (products) =>{
    if(products.length > 0){
        listProducts.innerHTML =""
        products.map(product =>{
            updateCartTotal(product.total)
            listProducts.innerHTML +=`
            <div class="row text-center">
                <div class="col col-12 col-sm-12 col-md-3">
                    <img class="w-50" src="${product.imagen}" >
                </div>
                <div class="col col-12 col-sm-12 col-md-2">
                    <p>${product.nombre} - $${product.precio_venta} </p>
                </div>
                <div class="col col-12 col-sm-12 col-md-2">
                <label for="cuantityp">Piezas:</label>
                <div class="input-group">
                <div class="input-group-prepend">
                    <button onclick="removeOne(${product.num})" class="btn btn-primary btn-sm" type="button">
                        <i class="fas fa-minus fa-sm"></i>
                    </button>
                </div>
                <input type="text" id="inputnum${product.num}"  min="1" value="${product.cantidad}" class="form-control bg-light border-0 small" >
                <div class="input-group-append">
                    <button onclick="addOne(${product.num})" class="btn btn-primary btn-sm" type="button">
                        <i class="fas fa-plus fa-sm"></i>
                    </button>
                </div>
            </div>
                </div>
                <div class="col mt-2 col-12 col-sm-12 col-md-2">
                    <p> Subtotal: $${product.total}</p>
                </div>
                <div class="col mt-2 col-12 col-sm-12 col-md-2">
                    <button onclick="remove(${product.num})" class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div> 
            <hr>`
        })
        totalH5.innerHTML = `Total del carrito: $${totalCart}`

    }else{
        listProducts.innerHTML ="Tu carrito esta vacio."
        totalH5.innerHTML = ``
    }
 
}

const addOne = async(num) =>{
    const input = document.getElementById(`inputnum${num}`)
    input.value = parseFloat(input.value)+1;
    while(input.value > 10){
        input.value = 10
        return
    }
    const newCuantity = await updateProductCuantity(num, input.value)
    if(newCuantity.status == "ok"){
        input.value = newCuantity.cuantityChanged[0].cantidad
        totalCart = 0;
        await renderProducts(await getClientCarProducts())
    } else{
        createToast("Algo paso, intentalo de nuevo.","error")
    }
}
const removeOne = async(num) =>{
    const input = document.getElementById(`inputnum${num}`)
    input.value = parseFloat(input.value)-1;
    while(input.value < 1){
        input.value = 1
        return
    }
    const newCuantity = await updateProductCuantity(num, input.value)
    if(newCuantity.status == "ok"){
        input.value = newCuantity.cuantityChanged[0].cantidad
        totalCart = 0;
        await renderProducts(await getClientCarProducts())
    } else{
        createToast("Algo paso, intentalo de nuevo.","error")
    }
}
const remove = async (num)=>{
    let deleteConfirm = confirm('¿Quitar producto del carrito?')
    if(deleteConfirm){
        const results = await removeProduct(num)
        if(results.status == "ok"){
            createToast("Producto eliminado del carrito.","success")
            totalCart = 0;
            await renderProducts(await getClientCarProducts())
            updateCounter()
           
        }else{
            createToast("Algo paso, intentalo de nuevo.","error")
        }
    }
}

btnConfirmOrder.addEventListener('click',async()=>{
    const results = await confirmOrder()
    if(results.status == "ok"){
        createToast("Orden confirmada, espera por tu pedido.","success")
       
        socket.emit('clientCustomer:sendChefNewOnlineOrder')
        socket.emit('clientCustomer:sendBarmanNewOnlineOrder')
        await renderProducts(await getClientCarProducts())
        updateCounter()
    }else{
        createToast("Algo paso, intentalo de nuevo.","error")
        updateCounter()
    }
})

window.onload = async()=>{
    await renderProducts(await getClientCarProducts())
}


 

const productsDiv = document.getElementById('productsList')
const drinksCheck = document.getElementById('checkDrinks')
const dishesCheck = document.getElementById('checkDishes')
const searchInput = document.getElementById('searchInput')


let localProducts = []



const spinner = () =>(`
<center>
     <div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
    </div>
</center>`)

const getProducts = async () => {
    const url = '/api/getproducts'
    productsDiv.innerHTML = spinner()
    const response = await fetch(url)
    const products = await response.json()
    localProducts = products;
    return products;
}

const addToCar = async(id, cuantity)=>{
    const url = `/api/client/addtocar/${id}/${cuantity}`
    const response = await fetch(url)
    return response.json();
}
drinksCheck.addEventListener("change",async()=>{
    dishesCheck.checked = false;
    if(drinksCheck.checked){
        await filterByDrinks()
    }else{
        renderProducts(localProducts)
    }
})
dishesCheck.addEventListener("change",async()=>{
    drinksCheck.checked = false;
    if(dishesCheck.checked){
        await filterByDishes()  
    }else{
        renderProducts(localProducts)
    }
})
searchInput.addEventListener("keyup",async()=>{
    filterByName(searchInput.value)
    drinksCheck.checked = false;
    dishesCheck.checked = false;

})

const filterByDrinks = async() =>{
    let drinks = localProducts.filter(p => p.fk_categoria == 1)
    renderProducts(drinks)
}
const filterByDishes = async()=>{
    let dishes = localProducts.filter(p => p.fk_categoria == 2)
    renderProducts(dishes)
}

const filterByName = async(value)=>{
    let filtered = localProducts.filter(p => p.nombre.includes(value))
    renderProducts(filtered)
}


const renderProducts = async (products) => {
    //const products = await getProducts()
    productsDiv.innerHTML = ""
    products.map(product => {
        productsDiv.innerHTML += `
        <div class="col">
            <div class="card my-1 shadow" style="width: 100%;">
                <img src="${product.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-title">${product.nombre} - $${product.precio_venta}</p>
                    <div class="d-flex justify-content-between">
                    <input id="cuantityInput${product.id}" max="10" onkeyup="verifyInputValue(this.value, ${product.id})" type="number" value="1" min="1" placeholder="Piezas" class="form-control w-25">
                    <button id="btnAddToCar${product.id}" onclick="addProductToOrder(${product.id})" class="btn btn-primary"><i class="fas fa-cart-plus"></i></a>
                    </div>       
                </div>
            </div>
        </div>`})
}
const addProductToOrder = async(id) =>{
    const cuantity = document.getElementById(`cuantityInput${id}`)
    const results = await addToCar(id,cuantity.value)
    if(results.status == "cuantityExceding"){
        createToast("Solo puedes agregar 10 piezas por producto.","error")
        return
    }
    if(results.status == "ok"){
        updateCounter()
        createToast("Producto agregado al carrito.","success")
        
    }else{
        updateCounter()
        createToast("Algo paso, intentalo de nuevo.","error")
    }
}

const verifyInputValue = (value, productbuttonid)=>{
    const addToCarBtn = document.getElementById(`btnAddToCar${productbuttonid}`)
    if(parseFloat(value) < 1){
        addToCarBtn.disabled = true;
        console.log('ingrese una cantidad aceptada')
    }else{
        addToCarBtn.disabled = false;
    }
}

window.onload = async () => {
     renderProducts(await getProducts())
     updateCounter()
}


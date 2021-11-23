const ordersListDiv = document.getElementById('listOrders')
const modalTitle = document.getElementById('titleModal')
const detailsDiv = document.getElementById('details')
const checkAll = document.getElementById('checkAll')
const checkOnDeliver = document.getElementById('checkOnDeliver')
const checkDelivered = document.getElementById('checkDelivered')
const searchInput = document.getElementById('searchInput')

let localOrders = []


const getOrders = async ()=>{
    const url = '/api/client/getOrders'
    const response = await fetch(url)
    const orders = await response.json();
    localOrders = orders;
    return orders;
}
const getOrderDetails = async (id) =>{
    const url = `/api/client/getorderDetail/${id}`
    const response = await fetch(url)
    const details = await response.json();
    console.log(details)
    return details
}


const renderOrders = (orders)=>{
     ordersListDiv.innerHTML =""
     orders.map(order =>{
         ordersListDiv.innerHTML += `
         <div class="col col-sm-12 col-12 col-md-6 col-lg-4">
            <div class="card my-2 text-center shadow" style="width: 18rem;">
                <div class="card-body ">
                    <h5 class="card-title">No. de Pedido: ${order.id}</h5>
                    <p class="card-text">Estatus:  ${order.estatus}</p
                    <p class="card-text">Importe:  $${order.totalpedido}</p>
                    <button onclick="getDetails(${order.id})" type="button" class="btn btn-primary" data-toggle="modal" data-target="#orderDetailModal">Ver detalles</button>
                </div>
            </div>
         </div>`
     })
}

const getDetails = async (id)=>{
    const details = await getOrderDetails(id)
    modalTitle.innerText = `Pedido: ${id}`
    detailsDiv.innerHTML =""
    details.map(detail =>{
        detailsDiv.innerHTML +=`
        <tr>
            <td>${detail.nombre}</td>
            <td>${detail.precio_venta}</td>
            <td>${detail.cantidad}</td>
            <td>${detail.total}</td>
        </tr> `
    })
}

checkAll.addEventListener("change",async ()=>{
    if(checkAll.checked == true){
        checkDelivered.checked = false;
        checkOnDeliver.checked = false;
        renderOrders(localOrders)
    }
})

checkOnDeliver.addEventListener("change",async()=>{
    if(checkOnDeliver.checked == true){
        checkAll.checked = false;
        checkDelivered.checked = false;
        const onDeliver = localOrders.filter(order => order.estatus == "Entrega")
        renderOrders(onDeliver)
    }else{
        renderOrders(localOrders)
    }

})

checkDelivered.addEventListener("change",async()=>{
    if(checkDelivered.checked == true){
        checkAll.checked = false
        checkOnDeliver.checked = false;
        const Delivered = localOrders.filter(order => order.estatus == "Entregado")
        renderOrders(Delivered)
    }else{
        renderOrders(localOrders)
    }
})

const filterById = (id)=>{
    let filtered = localOrders.filter(order => order.id == id)
    renderOrders(filtered)
}


searchInput.addEventListener('keyup',()=>{
    if(searchInput.value !==""){
        filterById(searchInput.value)
        checkAll.checked = false;
        checkOnDeliver.checked = false;
        checkOnDeliver.checked = false;
    }else{
        checkAll.checked = true;
        renderOrders(localOrders)
    }
   
})





window.onload = async()=>{
 checkAll.checked = true;
 renderOrders(await getOrders())
}
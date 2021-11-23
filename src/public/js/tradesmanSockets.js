const listOrders = document.getElementById('listarPedidos')
const modalTitle = document.getElementById('titleModal')
const detailsDiv = document.getElementById('details')
const btnDeliver = document.getElementById('btnDeliver')



const setEstatusDelivered = async (id)=>{
    const url = `/api/tradesman/markdelivered/${id}`
    const response = await fetch(url)
    const results = await response.json();
    return results;
}

const getPreparedOrders = async ()=>{
    const url = '/api/tradesman/prepareorders'
    const response = await fetch(url)
    const preparedOrders = await response.json();
    console.log(preparedOrders)
    return preparedOrders
}

const getDetailsOrder = async (id) =>{
    const url = `/api/tradesman/getdetail/${id}`
    const response = await fetch(url)
    const details = await response.json();
    return details;
}

const deliverOrder = async (id)=>{
    const url = `/api/tradesman/deliverorder/${id}`
    const response = await fetch(url)
    const results = response.json();
    return results;
}

const renderOrders = async (orders) =>{
    listOrders.innerHTML = ""
    orders.map(order =>{
        listOrders.innerHTML += `
        <div class="col col-sm-6 col-12 col-md-6 col-lg-4 col-xl-3">
           <div class="card my-2 text-center shadow" style="width: 18rem;">
               <div class="card-body ">
                   <h5 class="card-title">No. ${order.id} - Cliente: ${order.nombre}</h5>
                   <p class="card-text">Dirección: ${order.direccion}</p>
                   <p class="card-text">Teléfono: ${order.telefono}</p>
                   <p class="card-text">${order.estatus == 'Entrega' ? order.estatus : ''} </p>
                   <button onclick="getDetails(${order.id})" type="button" class="btn btn-primary" data-toggle="modal" data-target="#orderDetailModal">Ver detalles</button>
                   ${order.estatus == 'Entrega' ? `<button onclick="markAsDelivered(${order.id})" type="button" class="btn btn-primary">Entregado</button>` : ''}
               </div>
           </div>
        </div>`
    })
}

const markAsDelivered = async (id) =>{
    const markResults = await setEstatusDelivered(id)
    if(markResults.status == "ok"){
        createToast(`Pedido entregado, ¡sigue asi!`,"success")
        renderOrders(await getPreparedOrders())
    }else{
        createToast(`Algo sucedió, inténtalo de nuevo.`,"error")
    }
}



const getDetails = async (id)=>{
    const details = await getDetailsOrder(id)
    modalTitle.innerText = `Pedido: ${id}`
    btnDeliver.setAttribute('data-id',id)
    detailsDiv.innerHTML =""
    details.map(detail =>{
        detailsDiv.innerHTML +=`
        <tr class="${detail.estatus == 'Preparacion' ? 'bg-dark text-white' : 'bg-success text-white'}">
            <td>${detail.nombre}</td>
            <td>${detail.estatus}</td>
        </tr> `
    })
}


btnDeliver.addEventListener("click",async ()=>{
    const deliverResults = await deliverOrder(btnDeliver.dataset.id)
    console.log(deliverResults)
    if(deliverResults.status == "ok"){
        createToast(`Notificación enviada, prepárate para entregar el pedido ${btnDeliver.dataset.id}`,"success")
        renderOrders(await getPreparedOrders())
    }else{
        createToast(`Algo sucedió, inténtalo de nuevo.`,"error")
    }
})









window.onload = async()=>{
renderOrders(await getPreparedOrders())
}
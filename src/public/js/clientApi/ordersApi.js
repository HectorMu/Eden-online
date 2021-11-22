const ordersListDiv = document.getElementById('listOrders')
const modalTitle = document.getElementById('titleModal')
const detailsDiv = document.getElementById('details')
const getOrders = async ()=>{
    const url = '/api/client/getOrders'
    const response = await fetch(url)
    const orders = await response.json();
    return orders;
}
const getOrderDetails = async (id) =>{
    const url = `/api/client/getorderDetail/${id}`
    const response = await fetch(url)
    const details = await response.json();
    console.log(details)
    return details
}


const renderOrders = async()=>{
     const orders = await getOrders();
     ordersListDiv.innerHTML =""
     orders.map(order =>{
         ordersListDiv.innerHTML += `
         <div class="col col-sm-12 col-12 col-md-6 col-lg-4">
            <div class="card my-2 text-center shadow" style="width: 18rem;">
                <div class="card-body ">
                    <h5 class="card-title">No. de Pedido: ${order.id}</h5>
                    <p class="card-text">Estatus:  ${order.estatus}</p
                    <p class="card-text">Importe:  $${order.totalpedido}</p>
                    <button onclick="getDetails(${order.id})" type="button" class="btn btn-primary" data-toggle="modal" data-target="#orderDetailModal">Ver detalle</button>
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








window.onload = async()=>{
 await renderOrders()
}
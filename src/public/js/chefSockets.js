const getOrders = async (id) =>{
    const url = `/api/chef/orderdetail/${id}`
    const response = await fetch(url);
    return response.json();
}

socket.on('server:waiterSendOrdersChef',async(orders)=>{
    await renderOrders(orders)
})


window.onload = () =>{
    socket.emit('clientChef:getAllOrders')

    socket.on('server:chefGetAllOrders', async(orders) =>{
        console.log(orders)
        await renderOrders(orders)
    }) 
}

const ordersDiv = document.getElementById('listarPedidos')
const renderOrders = async(orders)=>{
    ordersDiv.innerHTML=""
        orders.map(order =>{ 
            ordersDiv.innerHTML += `
            <div class="card">
            <div class="card-header" id="heading${order.id}">
              <h2 class="mb-0">
                <button class="btn btn-link btn-block text-left collapsedetail" data-id="${order.id}" type="button" data-toggle="collapse" data-target="#collapse${order.id}" aria-expanded="true" aria-controls="collapseOne">
                ${order.mesa}
                </button>
              </h2>
            </div>
            <div id="collapse${order.id}" class="collapse" aria-labelledby="heading${order.id}" >
              <div class="card-body">
              <div class="row">
                <div class="col col-sm-12 col-12 col-lg-8 col-md-8 col-xl-8">
                    <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 row-cols-md-2 row-cols-sm-2" data-orderdetail="${order.id}"></div>
                </div>
              </div>
            </div>
          </div>`
        })
        const collapseBtn = ordersDiv.querySelectorAll('.collapsedetail')
        collapseBtn.forEach(button =>{
            button.addEventListener('click',async()=>{
                const detailDiv = document.querySelector(`[data-orderdetail="${button.dataset.id}"]`)
                const details = await getOrders(button.dataset.id)
                if(details.length > 0){
                    detailDiv.innerHTML ="";
                    details.map(detail => {
                        detailDiv.innerHTML += `
                        <div class="col">
                            <div class="card my-2" style="width: 16rem;">
                                <div class="card-body">
                                    <h5 class="card-title">${detail.nombre} </h5>
                                    <p class="card-text">Cantidad: ${detail.cantidad}.</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
                                </div>
                            </div>
                        </div>  
                     `})           
                }else{
                    detailDiv.innerHTML ="<h4>Esta orden aun sigue en captura.</h4>"
                }
            })
        })
}

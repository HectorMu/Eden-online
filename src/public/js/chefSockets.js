if (window.location.href == 'http://localhost:3000/chef/orders') {
  const ordersDiv = document.getElementById('listarPedidos')
  const getOrders = async (id) => {
    const url = `/api/chef/orderdetail/${id}`
    const response = await fetch(url)
    return response.json()
  }
  const finishOrder = async (id) => {
    const url = `/api/chef/finishorder/${id}`
    const response = await fetch(url)
    return response.json()
  }
  const overWriteIfExists = (id) => {
    const card = document.getElementById(`orderCard${id}`)
    return card ? true : false
  }

  const addOrderDiv = (order) => {
    const result = overWriteIfExists(order.id)
    if (result) {
      const card = document.getElementById(`orderCard${order.id}`)
      card.remove()
    } else {
      Toastify({
        text: `Nueva orden`,
        className: 'info text-center mt-2 w-100 toast-font',
        position: 'center',
        gravity: 'top',
        style: { background: '#4e73df' }
      }).showToast()
    }
    ordersDiv.innerHTML += `
        <div class="card" id="orderCard${order.id}">
        <div class="card-header" id="heading${order.id}">
                    <div class="d-flex justify-content-between">
                    <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left collapsedetail" data-id="${order.id}" type="button" data-toggle="collapse" data-target="#collapse${order.id}" aria-expanded="true" aria-controls="collapseOne">
                    ${order.mesa} - Orden: ${order.id}
                    </button>
                    </h2>
                <div class="row">
                    <div class="col">
                        <button data-finishorder="${order.id}" class="btn btn-primary btn-sm finishOrder"><i class="fas fa-check-double"></i></button>              
                    </div>
                </div>
            </div>
            </div>
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
    setActionsToButtons()
  }

  socket.on('server:waiterSendOrdersChef', async (orders, id) => {
    const existingCard = document.getElementById(`orderCard${id}`)
    if (existingCard) {
      Toastify({
        text: `Cambios en la orden: ${id}`,
        className: 'info text-center mt-2 w-100 toast-font',
        position: 'center',
        gravity: 'top',
        style: { background: '#4e73df' }
      }).showToast()
    }
    await addOrderDiv(orders[orders.length - 1])
  })

  window.onload = () => {
    socket.emit('clientChef:getAllOrders')

    socket.on('server:chefGetAllOrders', async (orders) => {
      await renderOrders(orders)
    })
  }

  console.log(socket)

  const renderOrders = async (orders) => {
    ordersDiv.innerHTML = ''
    orders.map((order) => {
      ordersDiv.innerHTML += `
            <div class="card" id="orderCard${order.id}">
            <div class="card-header" id="heading${order.id}">
            <div class="d-flex justify-content-between">
                        <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left collapsedetail" data-id="${order.id}" type="button" data-toggle="collapse" data-target="#collapse${order.id}" aria-expanded="true" aria-controls="collapseOne">
                        ${order.mesa} - Orden: ${order.id}
                        </button>
                        </h2>
                    <div class="row">
                        <div class="col">
                            <button data-finishorder="${order.id}" class="btn btn-primary btn-sm finishOrder"><i class="fas fa-check-double"></i></button>              
                        </div>
                    </div>
                </div>
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
    setActionsToButtons()
  }

  const setActionsToButtons = () => {
    const collapseBtn = ordersDiv.querySelectorAll('.collapsedetail')
    collapseBtn.forEach((button) => {
      button.addEventListener('click', async () => {
        const detailDiv = document.querySelector(
          `[data-orderdetail="${button.dataset.id}"]`
        )
        const details = await getOrders(button.dataset.id)
        if (details.length > 0) {
          detailDiv.innerHTML = ''
          details.map((detail) => {
            detailDiv.innerHTML += `
                    <div class="col">
                        <div class="card my-2" style="width: 16rem;">
                            <div class="card-body">
                                <h5 class="card-title">${detail.nombre} </h5>
                                <p class="card-text">Cantidad: ${detail.cantidad}.</p>
                            </div>
                        </div>
                    </div>  
                 `
          })
        } else {
          detailDiv.innerHTML = '<h4>Esta orden aún está en captura.</h4>'
        }
      })
    })
    const sendButtons = document.querySelectorAll('.finishOrder')
    sendButtons.forEach((button) => {
      button.addEventListener('click', async (e) => {
        e.preventDefault()
        const results = await finishOrder(button.dataset.finishorder)
        if (results.status == 'ok') {
          Toastify({
            text: `Orden ${button.dataset.finishorder} terminada.`,
            className: 'info text-center mt-2 w-100 toast-font',
            position: 'center',
            gravity: 'top',
            style: { background: '#4e73df' }
          }).showToast()

          socket.emit('clientChef:getAllOrders')
          socket.emit('clientChef:OrderFinished', button.dataset.finishorder)
        } else {
          Toastify({
            text: `Algo sucedió, inténtalo de nuevo.`,
            className: 'info text-center mt-2 w-100 toast-font',
            position: 'center',
            gravity: 'top',
            style: { background: 'red' }
          }).showToast()
        }
      })
    })
  }

  const searchInput = document.getElementById('searchInput')
  searchInput.addEventListener('keyup', () => {
    socket.emit('clientChef:getAllOrders')
    socket.on('server:chefGetAllOrders', async (orders) => {
      await renderOrders(
        orders.filter((order) => order.id == searchInput.value)
      )
      if (searchInput.value == '') {
        await renderOrders(orders)
      }
    })
  })
}

//online orders

if (window.location.href == 'http://localhost:3000/chef/onlineorders') {
  const onlineOrdersdiv = document.getElementById('listarPedidosOnline')
  const getOnlineOrders = async (id) => {
    const url = `/api/chef/online/orderdetail/${id}`
    const response = await fetch(url)
    return response.json()
  }
  const finishOnlineOrder = async (id) => {
    const url = `/api/chef/online/finishorder/${id}`
    const response = await fetch(url)
    return response.json()
  }
  const overWriteOnlineOrderIfExists = (id) => {
    const card = document.getElementById(`orderCard${id}`)
    return card ? true : false
  }

  const addOnlineOrderDiv = (order) => {
    const result = overWriteOnlineOrderIfExists(order.id)
    if (result) {
      const card = document.getElementById(`orderCard${order.id}`)
      card.remove()
    } else {
      Toastify({
        text: `Nueva orden`,
        className: 'info text-center mt-2 w-100 toast-font',
        position: 'center',
        gravity: 'top',
        style: { background: '#4e73df' }
      }).showToast()
    }
    onlineOrdersdiv.innerHTML += `
        <div class="card" id="orderCard${order.id}">
        <div class="card-header" id="heading${order.id}">
                    <div class="d-flex justify-content-between">
                    <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left collapsedetail" data-id="${order.id}" type="button" data-toggle="collapse" data-target="#collapse${order.id}" aria-expanded="true" aria-controls="collapseOne">
                    Orden: ${order.id} - ${order.nombre}
                    </button>
                    </h2>
                <div class="row">
                    <div class="col">
                        <button data-finishorder="${order.id}" class="btn btn-primary btn-sm finishOnlineOrder"><i class="fas fa-check-double"></i></button>              
                    </div>
                </div>
            </div>
            </div>
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
    setActionsToOnlineOrdersButtons()
  }

  socket.on('server:customerSendOnlineOrdersChef', async (orders, id) => {
    const existingCard = document.getElementById(`orderCard${id}`)
    if (existingCard) {
      Toastify({
        text: `Cambios en la orden ${id}`,
        className: 'info text-center mt-2 w-100 toast-font',
        position: 'center',
        gravity: 'top',
        style: { background: '#4e73df' }
      }).showToast()
    }
    await addOnlineOrderDiv(orders[orders.length - 1])
  })

  window.onload = () => {
    socket.emit('clientChef:getAllOnlineOrders')
    socket.on('server:chefGetAllOnlineOrders', async (orders) => {
      console.log(orders)
      await renderOnlineOrders(orders)
    })
  }

  const renderOnlineOrders = async (orders) => {
    onlineOrdersdiv.innerHTML = ''
    orders.map((order) => {
      onlineOrdersdiv.innerHTML += `
            <div class="card" id="orderCard${order.id}">
            <div class="card-header" id="heading${order.id}">
            <div class="d-flex justify-content-between">
                        <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left collapsedetail" data-id="${order.id}" type="button" data-toggle="collapse" data-target="#collapse${order.id}" aria-expanded="true" aria-controls="collapseOne">
                        Orden: ${order.id} - ${order.nombre}
                        </button>
                        </h2>
                    <div class="row">
                        <div class="col">
                            <button data-finishorder="${order.id}" class="btn btn-primary btn-sm finishOnlineOrder"><i class="fas fa-check-double"></i></button>              
                        </div>
                    </div>
                </div>
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
    setActionsToOnlineOrdersButtons()
  }

  const setActionsToOnlineOrdersButtons = () => {
    const collapseBtn = onlineOrdersdiv.querySelectorAll('.collapsedetail')
    collapseBtn.forEach((button) => {
      button.addEventListener('click', async () => {
        const detailDiv = document.querySelector(
          `[data-orderdetail="${button.dataset.id}"]`
        )
        const details = await getOnlineOrders(button.dataset.id)
        if (details.length > 0) {
          detailDiv.innerHTML = ''
          details.map((detail) => {
            detailDiv.innerHTML += `
                    <div class="col">
                        <div class="card my-2" style="width: 16rem;">
                            <div class="card-body">
                                <h5 class="card-title">${detail.nombre} </h5>
                                <p class="card-text">Cantidad: ${detail.cantidad}.</p>
                            </div>
                        </div>
                    </div>  
                 `
          })
        } else {
          detailDiv.innerHTML = '<h4>Esta orden aun sigue en captura.</h4>'
        }
      })
    })
    const sendButtons = document.querySelectorAll('.finishOnlineOrder')
    sendButtons.forEach((button) => {
      button.addEventListener('click', async (e) => {
        e.preventDefault()
        const results = await finishOnlineOrder(button.dataset.finishorder)
        if (results.status == 'ok') {
          Toastify({
            text: `Pedido en linea ${button.dataset.finishorder} terminado.`,
            className: 'info text-center mt-2 w-100 toast-font',
            position: 'center',
            gravity: 'top',
            style: { background: '#4e73df' }
          }).showToast()

          socket.emit('clientChef:getAllOnlineOrders')
          socket.emit(
            'clientChef:OnlineOrderFinished',
            button.dataset.finishorder
          )
        } else {
          Toastify({
            text: `Algo sucedio, intental de nuevo.`,
            className: 'info text-center mt-2 w-100 toast-font',
            position: 'center',
            gravity: 'top',
            style: { background: 'red' }
          }).showToast()
        }
      })
    })
  }

  const searchOnlineInput = document.getElementById('searchInputOnline')
  searchOnlineInput.addEventListener('keyup', () => {
    socket.emit('clientChef:getAllOnlineOrders')
    socket.on('server:chefGetAllOnlineOrders', async (orders) => {
      await renderOnlineOrders(
        orders.filter((order) => order.id == searchOnlineInput.value)
      )
      if (searchOnlineInput.value == '') {
        await renderOnlineOrders(orders)
      }
    })
  })
}

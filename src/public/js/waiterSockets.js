socket.on("server:notifyWaiter", () => {
  Push.create("Pedido listo!", {
    body: "Recoger nuevo pedido",
    icon: "/icon.png",
  });
});

socket.on("server:chefOrderFinished", (id) => {
  Toastify({
    text: `Platillos de la orden ${id} listos para recoger.`,
    className: "info text-center mt-2 w-100 toast-font",
    position: "center",
    gravity: "top",
    style: { background: "#4e73df" },
  }).showToast();
});

socket.on("server:barmanOrderFinished", (id) => {
  Toastify({
    text: `Bebidas de la orden ${id} listas para recoger.`,
    className: "info text-center mt-2 w-100 toast-font",
    position: "center",
    gravity: "top",
    style: { background: "#4e73df" },
  }).showToast();
});

const searchInput = document.getElementById("searchInput");
const buttons = document.querySelectorAll(".buttonorder");
const allCards = document.querySelectorAll(".card");
searchInput.addEventListener("keyup", () => {
  for (let i = 0; i < buttons.length; i++) {
    if (searchInput.value == "" || searchInput.value == null) {
      buttons[i].classList.remove("d-none");
      allCards[i].classList.remove("d-none");
    }
    if (!buttons[i].textContent.includes(searchInput.value)) {
      buttons[i].classList.add("d-none");
      allCards[i].classList.add("d-none");
    }
  }
});
const tableSpinner = () => `
<div class="d-flex justify-content-center mt-2">
     <div class="spinner-border text-primary" role="status">
    <span class="sr-only">Loading...</span>
    </div>
</div>`;

const getOrders = async (id) => {
  const url = `/api/orderdetail/${id}`;
  const response = await fetch(url);
  return response.json();
};
const sendToChefOrders = async (id) => {
  const url = `/api/sendorder/${id}`;
  const response = await fetch(url);
  return response.json();
};
const deleteProduct = async (id) => {
  const url = `/api/order/removeproduct/${id}`;
  const response = await fetch(url);
  const results = await response.json();
  return results;
};
const changeCuantity = async (id, newCuantity) => {
  const url = `/api/order/changecuantity/${id}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cuantity: newCuantity,
    }),
  });
  const results = await response.json();
  return results;
};
const changeColorByEstatus = (estatus) => {
  if (estatus == "Preparacion") {
    return "bg-dark text-white";
  }
  if (estatus == "Preparado") {
    return "bg-success text-white";
  } else {
    return "";
  }
};
const renderOrderDetails = async (tableBody, id) => {
  const detailsDiv = document.getElementById("details");
  detailsDiv.innerHTML = tableSpinner();
  tableBody.innerHTML = tableSpinner();
  const details = await getOrders(id);

  tableBody.innerHTML = "";
  detailsDiv.innerHTML = "";
  details.map((detail) => {
    detailsDiv.innerHTML += `<tr class="${changeColorByEstatus(
      detail.estatus
    )}">
        <td>${detail.nombre}</td>
        <td>${detail.precio_venta}</td>
        <td>     
            <input placeholder="Nueva cantidad" data-newcuantityinput="${
              detail.num
            }" type="number"   class="form-control d-none"> 
            <div data-tdcuantity="${detail.num}">${detail.cantidad}</div> 
        <td>${parseFloat(detail.precio_venta * detail.cantidad)} </td>
        <td class="d-flex">
            <button type="submit" data-productnumcuantity="${
              detail.num
            }" class="btn btn-sm btn-info btn-sm mx-1 cuantityEdit"><i class="fas fa-pen"></i></button>
            <button type="submit" data-savecuantity="${
              detail.num
            }" class="btn btn-sm btn-info btn-sm mx-1 d-none"><i class="fas fa-check"></i></button>
            <button type="submit" data-productnum="${
              detail.num
            }" class="btn btn-danger btn-sm deleteProduct"><i class="fas fa-window-close"></i></button>
        </td>
    </tr>`;
    tableBody.innerHTML += `<tr class="${changeColorByEstatus(detail.estatus)}">
        <td>${detail.nombre}</td>
        <td>${detail.precio_venta}</td>
        <td>     
            <input placeholder="Nueva cantidad" data-newcuantityinput="${
              detail.num
            }" type="number"   class="form-control d-none"> 
            <div data-tdcuantity="${detail.num}">${detail.cantidad}</div> 
        <td>${parseFloat(detail.precio_venta * detail.cantidad)} </td>
        <td class="d-flex">
            <button type="submit" data-productnumcuantity="${
              detail.num
            }" class="btn btn-sm btn-info btn-sm mx-1 cuantityEdit"><i class="fas fa-pen"></i></button>
            <button type="submit" data-savecuantity="${
              detail.num
            }" class="btn btn-sm btn-info btn-sm mx-1 d-none"><i class="fas fa-check"></i></button>
            <button type="submit" data-productnum="${
              detail.num
            }" class="btn btn-danger btn-sm deleteProduct"><i class="fas fa-window-close"></i></button>
        </td>
    </tr>`;
  });
};
const cardHeaders = document.querySelectorAll(".card-header");
cardHeaders.forEach((header) => {
  header.addEventListener("click", async () => {
    const sideIdOrder = document.getElementById("drawId");
    sideIdOrder.innerHTML = `Detalles de orden: ${header.dataset.id}`;
    const tableBody = document.querySelector(
      `[data-detailTable="${header.dataset.id}"]`
    );
    const pTotal = document.querySelector(
      `[data-Saletotal="${header.dataset.id}"]`
    );
    const sideTotal = document.getElementById("sidetotal");
    let alltotal = 0;
    await renderOrderDetails(tableBody, header.dataset.id);
    const deleteButtons = document.querySelectorAll(".deleteProduct");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        let deleteConfirmation = confirm(
          `¿Eliminar producto de la orden ${header.dataset.id}?`
        );
        if (deleteConfirmation) {
          const results = await deleteProduct(button.dataset.productnum);
          if (results.status == "ok") {
            const headerclicked = document.querySelector(
              `[data-id="${header.dataset.id}"]`
            );
            headerclicked.click();
            Toastify({
              text: `Producto eliminado de la orden ${header.dataset.id}`,
              className: "info text-center mt-2 w-100 toast-font",
              position: "center",
              gravity: "top",
              style: { background: "#4e73df" },
            }).showToast();
          } else {
            headerclicked.click();
            Toastify({
              text: `Algo sucedió, inténtalo de nuevo.`,
              className: "info text-center mt-2 w-100 toast-font",
              position: "center",
              gravity: "top",
              style: { background: "red" },
            }).showToast();
          }
        }
      });
    });
    for (let i = 0; i < tableBody.rows.length; i++) {
      alltotal += parseFloat(tableBody.rows[i].cells[3].textContent);
    }
    if (alltotal > 0) {
      pTotal.innerHTML = `
     <div class="d-flex justify-content-between">
         <p>Total de orden: ${alltotal} $ pesos</p>
          <a href="/waiter/sendtocashier/${header.dataset.id}" class="btn btn-primary"><i class="fas fa-receipt"></i></a>
     </div>
      `;
      sideTotal.innerHTML = `
     <div class="d-flex justify-content-between">
         <p>Total de orden: ${alltotal} $ pesos</p>
          <a href="/waiter/sendtocashier/${header.dataset.id}" class="btn btn-primary"><i class="fas fa-receipt"></i></a>
     </div>
      `;
    } else {
      pTotal.innerHTML = `Esta orden aún no tiene productos.`;
    }
    const cuantityEditButtons = document.querySelectorAll(".cuantityEdit");
    cuantityEditButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const divCuantity = document.querySelector(
          `[data-tdcuantity="${button.dataset.productnumcuantity}"]`
        );
        divCuantity.classList.add("d-none");
        const newCuantityInput = document.querySelector(
          `[data-newcuantityinput="${button.dataset.productnumcuantity}"]`
        );
        newCuantityInput.classList.remove("d-none");
        newCuantityInput.value = divCuantity.textContent;
        const saveCuantityBtn = document.querySelector(
          `[data-savecuantity="${button.dataset.productnumcuantity}"]`
        );
        saveCuantityBtn.classList.remove("d-none");
        saveCuantityBtn.addEventListener("click", async () => {
          const headerclicked = document.querySelector(
            `[data-id="${header.dataset.id}"]`
          );
          let confirmCuantityEdit = confirm(
            `¿Guardar cambios en la orden ${header.dataset.id}`
          );
          if (confirmCuantityEdit) {
            const results = await changeCuantity(
              button.dataset.productnumcuantity,
              newCuantityInput.value
            );
            if (results.status == "ok") {
              headerclicked.click();
              Toastify({
                text: `La cantidad cambió correctamente`,
                className: "info text-center mt-2 w-100 toast-font",
                position: "center",
                gravity: "top",
                style: { background: "#4e73df" },
              }).showToast();
            } else {
              headerclicked.click();
              Toastify({
                text: `Algo sucedió, inténtalo de nuevo.`,
                className: "info text-center mt-2 w-100 toast-font",
                position: "center",
                gravity: "top",
                style: { background: "red" },
              }).showToast();
            }
          }
        });
        button.classList.add("d-none");
      });
    });
  });
});
const sendButtons = document.querySelectorAll(".sendOrder");
sendButtons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const results = await sendToChefOrders(button.dataset.sendbtnid);
    const headerclicked = document.querySelector(
      `[data-id="${button.dataset.sendbtnid}"]`
    );
    if (results.status == "ok") {
      headerclicked.click();
      headerclicked.classList.toggle("grow-height");
      Toastify({
        text: `Productos de orden ${button.dataset.sendbtnid} enviada para preparación.`,
        className: "info text-center mt-2 w-100 toast-font",
        position: "center",
        gravity: "top",
        style: { background: "#4e73df" },
      }).showToast();
      socket.emit("clientWaiter:sendChefNewOrder", button.dataset.sendbtnid);
      socket.emit("clientWaiter:sendBarmanNewOrder", button.dataset.sendbtnid);
    } else {
      headerclicked.click();
      headerclicked.classList.toggle("grow-height");
      Toastify({
        text: `Algo sucedió, inténtalo de nuevo.`,
        className: "info text-center mt-2 w-100 toast-font",
        position: "center",
        gravity: "top",
        style: { background: "red" },
      }).showToast();
    }
  });
});
const sendChefButtons = document.querySelectorAll(".sendChef");
sendChefButtons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const results = await sendToChefOrders(button.dataset.sendbtnid);
    const headerclicked = document.querySelector(
      `[data-id="${button.dataset.sendbtnid}"]`
    );
    if (results.status == "ok") {
      headerclicked.click();
      headerclicked.classList.toggle("grow-height");
      Toastify({
        text: `Platillos de orden ${button.dataset.sendbtnid} enviada para preparación.`,
        className: "info text-center mt-2 w-100 toast-font",
        position: "center",
        gravity: "top",
        style: { background: "#4e73df" },
      }).showToast();
      socket.emit("clientWaiter:sendChefNewOrder", button.dataset.sendbtnid);
    } else {
      headerclicked.click();
      headerclicked.classList.toggle("grow-height");
      Toastify({
        text: `Algo sucedió, inténtalo de nuevo.`,
        className: "info text-center mt-2 w-100 toast-font",
        position: "center",
        gravity: "top",
        style: { background: "red" },
      }).showToast();
    }
  });
});
const sendBarmanButtons = document.querySelectorAll(".sendBarman");
sendBarmanButtons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const results = await sendToChefOrders(button.dataset.sendbtnid);
    const headerclicked = document.querySelector(
      `[data-id="${button.dataset.sendbtnid}"]`
    );
    if (results.status == "ok") {
      headerclicked.click();
      headerclicked.classList.toggle("grow-height");
      Toastify({
        text: `Bebidas de orden ${button.dataset.sendbtnid} enviada para preparación.`,
        className: "info text-center mt-2 w-100 toast-font",
        position: "center",
        gravity: "top",
        style: { background: "#4e73df" },
      }).showToast();
      socket.emit("clientWaiter:sendBarmanNewOrder", button.dataset.sendbtnid);
    } else {
      headerclicked.click();
      headerclicked.classList.toggle("grow-height");
      Toastify({
        text: `Algo sucedió, inténtalo de nuevo.`,
        className: "info text-center mt-2 w-100 toast-font",
        position: "center",
        gravity: "top",
        style: { background: "red" },
      }).showToast();
    }
  });
});
const dropButtons = document.querySelectorAll(".dropOptions");
dropButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const header = document.getElementById(`header${button.dataset.drop}`);
    header.classList.toggle("grow-height");
  });
});
const closeSide = document.getElementById("closedetails");
const sidebar = document.getElementById("detailsbar");
const toggleDetailsButtons = document.querySelectorAll(".toggleSideDetails");
toggleDetailsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sidebar.classList.add("show-detail");
  });
});
const toggleSide = document.getElementById("toggleSidebar");

closeSide.addEventListener("click", () => {
  sidebar.classList.remove("show-detail");
});

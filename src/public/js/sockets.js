const socket = io()

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

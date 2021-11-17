const PUBLIC_VAPIDKEY = 'BGfgQWrr5M42aupYpGC6T8e8JNHucQO56Mq-QmuUiSEfblGFDFgaWZOSfOJiHfBeHG4JVxjANlt3hI3Yw1cPCww'

const subscription = async()=>{
    //service worker registration and config
   const registration =  await navigator.serviceWorker.register('/js/web-push/worker.js')
   const SWsubscription =  await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: PUBLIC_VAPIDKEY
    })

    await fetch('/suscribe',{
        method: 'POST',
        body: JSON.stringify(SWsubscription),
        headers:{ 'Content-Type':'application/json'},
    })
    console.log('Suscrito')
}


function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  subscription()
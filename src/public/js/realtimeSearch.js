export const liveSearch = (input, tBody) =>{
    input.addEventListener('keyup',()=>{
        for (let i = 0; i < tBody.rows.length; i++) { 
                if(!tBody.rows[i].childNodes[1].textContent.includes(input.value)){
                    
                    tBody.rows[i].classList.add('d-none')
                
                }else{
                    tBody.rows[i].classList.remove('d-none')
                }
                if(input.value ==""){
                    tBody.rows[i].classList.remove('d-none')
                }
        } 
    })
}


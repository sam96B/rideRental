


/* counter */
function plus(myId){
    const items = document.querySelector(`#by${myId} .total-of-items`)
    const total = document.querySelector(`#total`)
    const charge = document.querySelector(`#charge${myId}`)
    const counter = document.querySelector(`#counter`)
    items.textContent = parseInt(items.textContent)+1
    counter.textContent = parseInt(counter.textContent)+1
    total.textContent=parseInt(total.textContent)+parseInt(charge.textContent)
   

}
function minus(myId){
    const items = document.querySelector(`#by${myId} .total-of-items`)
    const counter = document.querySelector(`#counter`)
    items.textContent = parseInt(items.innerHTML)-1
    if(parseInt(items.innerHTML) < 0){
        items.textContent = 0
    }
    counter.textContent = parseInt(counter.innerHTML)-1
    if(parseInt(counter.innerHTML)< 0){
        counter.textContent=0
    }
}







import axios from 'axios';
import Noty from 'noty';
const initializeAdmin = require('./admin');

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.getElementById('cartCounter');

function updateCart(pizza){
axios.post('/update-cart',pizza).then(res=>{
    cartCounter.innerText = res.data.totalQty;
    new Noty({ 
        type: 'success',
        timeout: 1000,
        text: 'Item added to the cart',
        progressBar: false,
        // layout: 'topCenter'
    }).show();
    
}).catch(err=>{
    new Noty({ 
        type: 'error',
        timeout: 1000,
        text: 'Something went wrong !!',
        progressBar: false,
        // layout: 'topCenter'
    }).show();
})
}




addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
    })
})

const alertMsg = document.querySelector('#success-alert');
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove();
    },2000);
}
console.log("ran");
initializeAdmin();
import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'
import moment from 'moment'

let addToCart=document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter')

function updateCart(pizza){
    axios.post('/update-cart',pizza).then(res=>{
        cartCounter.innerText=res.data.totalQty
        new Noty({
            type:'success',
            timeout:1000,
            text: 'Item added to cart',
            progressBar:false
        }).show();
    }).catch(err=>{
        new Noty({
            type:'error',
            timeout:1000,
            text: 'Something went wrong',
            progressBar:false
        }).show();
    })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza=JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})

//remove alert message after x seconds
const alertMsg=document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    },2000)
}

initAdmin()

//change order status
let statuses=document.querySelectorAll('.status_line')
let hiddenInput=document.querySelector('#hiddenInput')
let order=hiddenInput?hiddenInput.value:null
order=JSON.parse(order)
let time=document.createElement('small')

function updateStatus(order){
    let stepCompleted=true;
    statuses.forEach((status)=>{
        let dataProp=status.dataset.status
        if(stepCompleted){
            status.classList.add('step-completed')
        }
        if(dataProp===order.status){
            stepCompleted=false
            time.innerText=moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
            }   
        }
    })
}

updateStatus(order);
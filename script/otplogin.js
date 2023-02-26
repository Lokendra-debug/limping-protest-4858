let pin=document.querySelector("#pin")
let button=document.querySelector("#button")

button.addEventListener("click",(event)=>{
    console.log(pin.value)
    if(pin.value==1234){
        window.location.href="index.html"
    }else{
        alert("pin is wronge")
    }
})
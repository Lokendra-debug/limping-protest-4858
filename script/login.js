let phoneNumber=document.querySelector("#login")
let button=document.querySelector("#button")

button.addEventListener("click",(event)=>{
    let checkvalue;
    fetch(`https://63f70f9de40e087c9586b6a6.mockapi.io/users?search=${phoneNumber.value}`).then((res)=>{
        return res.json()
    }).then((res)=>{
        checkvalue=res[0];
        if(phoneNumber.value==checkvalue.phoneNumber ){
            localStorage.setItem("currentuser",JSON.stringify(checkvalue));
            window.location.href="otplogin.html"

        }
        else{
            alert("Wrong Credentials Please signup !")
            window.location.href="singup.html"
        }
    }).catch((err)=>{
        alert("Wrong Credentials please signup!")
        window.location.href="singup.html"
    })
    
})
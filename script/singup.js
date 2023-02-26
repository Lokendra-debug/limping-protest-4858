let Name=document.querySelector("#name");
let age=document.querySelector("#age")
let email=document.querySelector("#email");
let phoneNumber=document.querySelector("#phoneNumber")
let password=document.querySelector("#password")
let button=document.querySelector("#button");

button.addEventListener("click",(event)=>{
    event.preventDefault()
    checksignup()
    async function checksignup(){
        try {
            let data=await fetch(`https://63f70f9de40e087c9586b6a6.mockapi.io/users?search=${phoneNumber.value}`)
            let result=await data.json();
            console.log(result)
            if(result[0].phoneNumber==phoneNumber.value){
                alert("your Phone Number has already been registered. please log in directly")
                window.location.href="login.html";
            }
        } catch (error) {
            console.log(Name.value)

            const data = { currentProducts:[],orderProducts:[],cartProducts:[],reviews:[],orderHistory:[],address:{},email:email.value,name:Name.value,password:password.value,age:age.value,phoneNumber:phoneNumber.value,avatar:""};

            fetch('https://63f70f9de40e087c9586b6a6.mockapi.io/users', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            
        }
    }

})
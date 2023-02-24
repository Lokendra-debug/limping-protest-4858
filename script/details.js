// let ProductImg=document.getElementById("asim-ProductImg")
// let smallImg=document.getElementsByClassName("asim-small-img")

// smallImg[0].onclick=()=>{
//     ProductImg.src=smallImg[0].src;
// }
// smallImg[1].onclick=()=>{
//     ProductImg.src=smallImg[1].src;
// }
// smallImg[2].onclick=()=>{
//     ProductImg.src=smallImg[2].src;
// }
// smallImg[3].onclick=()=>{
//     ProductImg.src=smallImg[3].src;
// }

// let brand=document.querySelector("h3")
// let category=document.querySelector("h1");
// let price=document.querySelector("h4");
// let desc=document.querySelector("p");

let ViewData=[];
ViewData.push(JSON.parse(localStorage.getItem("detail")))

console.log(ViewData)
let container=document.getElementById("asimcontainer");

display(ViewData)

function display(data){
    container.innerHTML="";

    data.forEach((ele) => {
        
        let card=document.createElement("div");

        let image=document.createElement("img");
        let desc=document.createElement("h3");
        let model=document.createElement("h2");
        let price=document.createElement("h3");

        image.src=ele.image;
        desc.textContent=ele.description;
        model.textContent=ele.model;
        price.textContent=`Rs${ele.price}`;
 
        card.append(image,model,desc,price);
        container.append(card);

    });
}
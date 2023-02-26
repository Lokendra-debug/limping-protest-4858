let ViewData=[];
ViewData.push(JSON.parse(localStorage.getItem("detail")));
console.log(ViewData);







let ProductImg=document.getElementById("asim-ProductImg")
let smallImg=document.getElementsByClassName("asim-small-img")

smallImg[0].onclick=()=>{
    ProductImg.src=smallImg[0].src;
}
smallImg[1].onclick=()=>{
    ProductImg.src=smallImg[1].src;
}
smallImg[2].onclick=()=>{
    ProductImg.src=smallImg[2].src;
}
smallImg[3].onclick=()=>{
    ProductImg.src=smallImg[3].src;
}
displayImg(ViewData)
function displayImg(data){
  
    data.forEach((el)=>{
        ProductImg.src=el.image;
        
        smallImg[0].src=el.image;
        smallImg[1].src=el.image;
        smallImg[2].src=el.image;
        smallImg[3].src=el.image;
    })
}
// let brand=document.querySelector("h3")
// let category=document.querySelector("h1");
// let price=document.querySelector("h4");
// let desc=document.querySelector("p");




let container=document.querySelector(".asimcontainer");


let checkData=[];

display(ViewData)
function display(data){
    container.innerHTML="";

    data.forEach((ele) => {
        
        let card=document.createElement("div");
        card.setAttribute("class","asim-card")
        
        let brand=document.createElement("h1")
        let desc=document.createElement("p");
        let category=document.createElement("h3");
        let price=document.createElement("h4");
     let tag=document.createElement("div");
     tag.setAttribute("class","asim-tag")
     let select=document.createElement("h4")
       let add=document.createElement("button");
       let rating=document.createElement("button");
       let wish=document.createElement("button");
       let addsec=document.createElement("div")
       addsec.setAttribute("class","asim-addsec")

       let hrTag=document.createElement("hr");


     let arr=["XXL","XL","LARGE","MEDIUM","SMALL"]

       for(let i=0;i<arr.length;i++){
        let option=document.createElement("button");
        option.value=arr[i];
        option.textContent=arr[i];
        tag.append(option);
       }
       select.textContent="Select Size  >>"
       rating.textContent=`${ele.rating} ☆ 22.5K Ratings`
       rating.setAttribute("class","asim-rating")
        desc.textContent=ele.description;
        category.textContent=ele.category;
        price.textContent=`Rs ${ele.price}`;
        brand.textContent=ele.brand;
        add.textContent="🔒 ADD TO BAG";
      wish.textContent="❤ WISHLIST"
        add.addEventListener("click",()=>{
      
       if(dublicate(ele)){
        alert("Product already Present");
    }
    else{
        alert("Product added");
        

            checkData.push((JSON.parse(localStorage.getItem("detail"))))
            
            localStorage.setItem("cart",JSON.stringify(checkData));
             
        
        
    }
})
      addsec.append(add,wish);

        card.append(brand,category,rating,desc,price,select,tag,addsec);
        container.append(card,hrTag);

    });

    function dublicate(ele){
        for(let i=0;i<checkData.length;i++){
            if(checkData[i].id===ele.id){
                return true;
            }
        }
        return false;
}
}
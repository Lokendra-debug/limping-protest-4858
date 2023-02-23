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

// let brand=document.querySelector("h3")
// let category=document.querySelector("h1");
// let price=document.querySelector("h4");
// let desc=document.querySelector("p");

function fetchingdata(){

    fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products/1").then((res)=>{
        return res.json();
}).then((objData)=>{
    var strData="";
    console.log(objData.data);
    let data=objData.data
    data.map((item)=>{ 
        strData=`
    <div>
    <h3>"${item.brand}"</h3>
    <h1>"${item.category}"</h1>
    <h4>"Rs.${item.price}"</h4>
    </div>
    ` 
})
document.getElementById("asim-append").innerHTML=strData;
})

}

fetchingdata()

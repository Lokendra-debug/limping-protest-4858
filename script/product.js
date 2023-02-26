const renderSimpleCard = (params = [], parent, callback = () => {}) => {
  params.forEach((data, index) => {
    const card = document.createElement("div");

    const image = document.createElement("img");
    image.src = data.image;

 
    const title = document.createElement("h4");
    title.innerText = `${data.description}`;

    const brand = document.createElement("p");
    brand.innerText = data.brand;

    const category = document.createElement("p");
    category.innerText = data.category;

    const price = document.createElement("p");
    price.innerText = `Rs ${data.price}`;

     
    

     const rating=document.createElement("p")
     rating.textContent=`${data.rating} ☆`

     let addToCart=document.createElement("button");
     addToCart.textContent="🔒 ADD TO BAG"
     addToCart.addEventListener("click",()=>{
      let newData=[];
      newData.push(data)
            localStorage.setItem("cart1",JSON.stringify(newData));
     })

    let extraEl = callback(data, index);
    card.append(image,  brand, category,title,rating,price);
    extraEl?.forEach((el) => {
      card.append(el);
    });
    parent.append(card);
  });
};

const filters = {
  brand: {},
  gender: {},
};
const brandCheckboxes = document.querySelectorAll(
  "#asim-brand-filter input[type='checkbox']"
);
const categoryCheckboxes = document.querySelectorAll(
  "#asim-category-filter input[type='checkbox']"
);

const priceFilterApply = document.getElementById("asim-filter-btn");

class RenderProducts {
  constructor(filterState, id, LSKey, fetchedData = []) {
    this.state = { filters: filterState,fetchedData, };
    this.parent = document.querySelector(`#${id}>div`);
    this.LSKey = LSKey;
    this.LSData = JSON.parse(localStorage.getItem(LSKey)) || [];
  }

// 1st private function
  #render(params = []) {
    this.parent.innerHTML = null;
    renderSimpleCard(params, this.parent, (data) => {
      const ViewMore = document.createElement("button");
      ViewMore.innerText = "View More >";
      ViewMore.addEventListener("click", () => {
        // for (let i = 0; i < this.LSData.length; i++) {
        //   if (this.LSData[i].id === data.id) {
        //           return alert("Product already in the cart");
        //   }
        // }
        this.LSData=({ id: data.id, quantity: 1,category:data.category,price: data.price,brand:data.brand,image:data.image,description:data.description,rating:data.rating });
        localStorage.setItem(this.LSKey, JSON.stringify(this.LSData));

       

      });
      ViewMore.addEventListener("click",()=>{
        window.location.href="http://127.0.0.1:5500/details.html"
        
      })
      
       
      return [ViewMore];
    });
  }

// 2nd private function
  #haveFilterBeenApplied(key = "") {
    for (let id in this.state.filters[key]) {
      if (this.state.filters[key][id] === true) {
        return true;
      }
    }
    return false;
  }

  // 3rd private function
  
   // If none of the brands are checked assume no filter has been applied

  #filterData() {
    let filtered = this.state.fetchedData;
    if (this.#haveFilterBeenApplied("brand")) {
      filtered = filtered.filter((el) => {
        return this.state.filters.brand[el.brand] === true;
      });
    }
// If none of the categories are checked assume no filter has been applied

    if (this.#haveFilterBeenApplied("gender")) {
      filtered = filtered.filter((el) => {
        return this.state.filters.gender[el.gender] === true;
      });
    }
    this.#render(filtered);
  }

  // normal function whch can be call from outside

  setState(callback = () => {}) {
    this.state = callback({ ...this.state });
    this.#filterData();
  }
}

const Products = new RenderProducts(filters,"asim-product-container","detail",[] );



  fetch(`https://63f70f9de40e087c9586b6a6.mockapi.io/products`).then((res)=>{
    // let totalcount=res.headers.get("X-Total-Count");
    // console.log("totalcount",totalcount)
    return res.json()
  })
  .then((data) => {
    console.log(data)
    Products.setState((el) => {
      return {
        ...el,
        fetchedData: data,
      };
    });
  });

brandCheckboxes.forEach((element) => {
  filters.brand[element.id] = element.checked;
  element.addEventListener("change", (e) => {
    Products.setState((state) => {
      state.filters.brand[e.target.id] = e.target.checked;
      return state;
    });
  });
});

categoryCheckboxes.forEach((element) => {
  filters.gender[element.id] = element.checked;
  element.addEventListener("change", (e) => {
    Products.setState((state) => {
      state.filters.gender[e.target.id] = e.target.checked;
      return state;
    });
  });
});
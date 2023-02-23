const renderSimpleCard = (params = [], parent, callback = () => {}) => {
  params.forEach((data, index) => {
    const card = document.createElement("div");

    const image = document.createElement("img");
    image.src = data.image;

    let anchor=document.createElement("a")
    // anchor.href="http://127.0.0.1:5500/details.html"
    
  anchor.addEventListener("click",()=>{
    return  anchor.href="http://127.0.0.1:5500/details.html"
  })
 
    const title = document.createElement("h4");
    title.innerText = data.title;

    const brand = document.createElement("p");
    brand.innerText = data.brand;

    const category = document.createElement("p");
    category.innerText = data.category;

    const price = document.createElement("p");
    price.innerText = data.price;
     
     anchor.append(image)

    let extraEl = callback(data, index);
    card.append(anchor, title, brand, category, price);
    extraEl?.forEach((el) => {
      card.append(el);
    });
    parent.append(card);
  });
};

const filters = {
  brand: {},
  category: {},
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
      const addToCart = document.createElement("button");
      addToCart.innerText = "Add To Cart";
      addToCart.addEventListener("click", () => {
        for (let i = 0; i < this.LSData.length; i++) {
          if (this.LSData[i].id === data.id) {
                  return alert("Product already in the cart");
          }
        }
        this.LSData.push({ id: data.id, quantity: 1 });
        localStorage.setItem(this.LSKey, JSON.stringify(this.LSData));
        alert("Product added to The cart");
      });

      return [addToCart];
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

    if (this.#haveFilterBeenApplied("category")) {
      filtered = filtered.filter((el) => {
        return this.state.filters.category[el.category] === true;
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

const Products = new RenderProducts(filters,"asim-product-container","cart",[] );

fetch(`https://63f70f9de40e087c9586b6a6.mockapi.io/products`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    Products.setState((el) => {
      return {
        ...el,
        fetchedData: data.data,
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
  filters.category[element.id] = element.checked;
  element.addEventListener("change", (e) => {
    Products.setState((state) => {
      state.filters.category[e.target.id] = e.target.checked;
      return state;
    });
  });
});
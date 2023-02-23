import renderSimpleCard from "./Modules/index.js";

let filter_brand=document.querySelectorAll("#Asim-brand-filter input[type=`checkbox`]")

let category_filter=document.querySelectorAll("#Asim-category-filter input [type=`checkbox`]");


class RenderProducts {
    constructor(filterState, id, LSKey, fetchedData = []) {
      this.state = {
        filters: filterState,
        fetchedData,
      };
      this.parent = document.querySelector(`#${id}>div`);
      this.LSKey = LSKey;
      this.LSData = JSON.parse(localStorage.getItem(LSKey)) || [];
    }

    #alert(msg = "") {
      document.getElementById("alert").innerText = msg;
    }
    #render(params = []) {
      this.parent.innerHTML = null;
      renderSimpleCard(params, this.parent, (data) => {
        const addToCart = document.createElement("button");
        addToCart.innerText = "Add To Cart";
        addToCart.addEventListener("click", () => {
          for (let i = 0; i < this.LSData.length; i++) {
            if (this.LSData[i].id === data.id) {
              this.#alert("Product already in the cart");
              return;
            }
          }
          this.LSData.push({ id: data.id, quantity: 1 });
          localStorage.setItem(this.LSKey, JSON.stringify(this.LSData));
          this.#alert("Product added to The cart");
        });

        return [addToCart];
      });
    }
    #haveFilterBeenApplied(key = "") {
      for (let id in this.state.filters[key]) {
        if (this.state.filters[key][id] === true) {
          return true;
        }
      }
      return false;
    }
    #filterData() {
      // If none of the brands are checked assume no filter has been applied
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
    setState(callback = () => {}) {
      this.state = callback({ ...this.state });
      this.#filterData();
    }
  }


// new code start

  const Products = new RenderProducts(filters,"product-container","cart",[] );

  fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products")
      .then((res) => res.json())
      .then((data) => {
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
(function () {
  ("use strict");
  const products = getAvailableProducts();
  const productsUl = document.querySelector("section.products ul");

  function renderProducts(products) {
    products.forEach((product) => {
      const li = document.createElement("li");

      let shipsToHTML = "";
      product.shipsTo.forEach(
        (country) => (shipsToHTML += `<li>${country}</li>`)
      );

      li.innerHTML = `
            <ul class="products-features" data-price=${product.price}>
                <li class="product-name">${product.name}</li>
                <li class="product-price">${product.price}</li>
                <li class="product-rating">${product.rating}</li>
                <ul class="ships-to country">${shipsToHTML}</ul>
            </ul>
        `;
      productsUl.appendChild(li);
    });
  }

  renderProducts(products);
  // variables for getting elements
  const searchInput = document.querySelector("#searchName");
  const maxPrice = document.querySelector("#maxPrice");
  const listItemsUl = document.querySelectorAll(".products-features");

  // ################ 2.1. Filter products

  const countrySelector = document.querySelector(".country select");

  countrySelector.addEventListener("change", () => {
    for (let i = 0; i < listItemsUl.length; i++) {
      let countryValue = listItemsUl[i].children[3].children;
      for (let j = 0; j < countryValue.length; j++) {
        let lowerCountries = countryValue[j].textContent.toLowerCase();
        if (countrySelector.value === lowerCountries) {
          listItemsUl[i].style.display = "";
        } else {
          listItemsUl[i].style.display = "none";
        }
      }
    }
  });

  // ################ 2.2 Searching for products
  const filterItems = () => {
    const searchInputValue = searchInput.value.toLowerCase();

    for (let i = 0; i < listItemsUl.length; i++) {
      let txtValue = listItemsUl[i].children[0].textContent.toLowerCase();

      if (txtValue.indexOf(searchInputValue) > -1) {
        listItemsUl[i].style.display = "";
      } else {
        listItemsUl[i].style.display = "none";
      }
    }
  };
  // ################ 2.3. Filter products based on max price
  let timer; // Timer identifier
  const waitTime = 2000; // Wait time in milliseconds

  // Listen for `keyup` event
  maxPrice.addEventListener("keyup", (e) => {
    const maxPriceValue = parseFloat(e.currentTarget.value);
    console.log(maxPriceValue);

    // maxPrice Search function
    const priceLimit = () => {
      for (let i = 0; i < listItemsUl.length; i++) {
        let listItemsPrices = parseFloat(
          listItemsUl[i].children[1].textContent
        );

        if (listItemsPrices <= maxPriceValue) {
          listItemsUl[i].style.display = "";
        } else {
          listItemsUl[i].style.display = "none";
        }
      }
    };

    // Clear timer
    clearTimeout(timer);

    // Wait for X ms and then process the request
    timer = setTimeout(() => {
      priceLimit();
    }, waitTime);
  });

  // ####### 2.5. Create some extra feature

  // ############### 2.6 Sort the products - optional

  let select = document.querySelector(".sort select");

  function comparator(a, b) {
    if (select.value === "LowToHigh") {
      if (a.dataset.price < b.dataset.price) return -1;
      else if (a.dataset.price > b.dataset.price) return 1;
      return 0;
    }
    if (select.value === "HighToLow") {
      if (b.dataset.price < a.dataset.price) return -1;
      else if (b.dataset.price > a.dataset.price) return 1;
      return 0;
    }
  }

  // Function to sort Data
  select.addEventListener("change", () => {
    console.log(select.value);
    var indexes = document.querySelectorAll("[data-price]");
    var indexesArray = Array.from(indexes);
    let sorted = indexesArray.sort(comparator);
    sorted.forEach((e) => {
      let list = document.createElement("li");
      productsUl.appendChild(list);
      list.appendChild(e);
    });
  });

  searchInput.addEventListener("input", filterItems); // search bar event listener
})();

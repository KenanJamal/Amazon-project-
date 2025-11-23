import { products, loadProductsfetch } from "../data/products.js";
import { cart, addToCart } from "./carts/cart.js";
import { formatCurrency } from "./utilites/price.js";

//making the HTML appear on the page

function displayProducts() {
  let finalHtml = "";
  products.forEach((product) => {
    let html = ` <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          ${product.extrainfo()}
          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button data-kenan = "${
            product.id
          }" class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>`;
    finalHtml += html;
  });
  document.querySelector(".products-grid").innerHTML = finalHtml;
}
function displayAddToCart() {
  let cartNumberOfItems = 0;
  cart.map((element) => {
    cartNumberOfItems += element.quantity;
  });

  document.querySelector(".cart-quantity").innerHTML = cartNumberOfItems;
  document.querySelectorAll(".add-to-cart-button").forEach((item) => {
    item.addEventListener("click", () => {
      const productId = item.dataset.kenan;
      addToCart(productId);
      cartNumberOfItems++;
      document.querySelector(".cart-quantity").innerHTML = cartNumberOfItems;
    });
  });
}

async function main() {
  await loadProductsfetch();
  displayProducts();
  displayAddToCart();
}
main();

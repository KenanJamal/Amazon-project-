import { cart, deleteButton } from "./cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utilites/price.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import deliveryTime from "../data/deliveryTime.js";

const today = dayjs();

let finalHtml = "";
cart.forEach((item) => {
  const ProductId = item.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === ProductId) {
      matchingProduct = product;
    }
  });

  let html = `<div class="cart-item-container container${matchingProduct.id}" >
            <div class="delivery-date">Delivery date: </div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">${formatCurrency(
                  matchingProduct.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    item.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span  data-Delete-Button ="${
                    matchingProduct.id
                  }" class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>
              <div class="delivery-options-title">
              <div class="hey">
                Choose a delivery option:
              </div>
                   ${Time(ProductId)}
                </div>

            
              </div>
            </div>
          </div>`;
  finalHtml += html;
});
function Time(ProductId) {
  let finalHtmlTime = "";
  deliveryTime.forEach((itemTime, index) => {
    const checked = index === 0 ? "checked" : "";
    let finaltime = today.add(itemTime.deliveryWait, "day");
    let timeFormat = finaltime.format("dddd , MMM DD");
    let finalTimeMoney =
      itemTime.priceCents === 0
        ? "FREE SHIPPING"
        : formatCurrency(itemTime.priceCents);

    let final = ` 
                
                <div class="delivery-option">
                  <input
                    type="radio"
                    ${checked}
                    class="delivery-option-input"
                    name="delivery-option-${ProductId}"
                  />
                  <div>
                    <div class="delivery-option-date">${timeFormat}</div>
                    <div class="delivery-option-price">${finalTimeMoney}</div>
                  </div>  
                </div>
                `;
    finalHtmlTime += final;
  });
  return finalHtmlTime;
}

document.querySelector(".order-summary").innerHTML = finalHtml;
document.querySelectorAll(".delete-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const deleteItem = link.dataset.deleteButton;
    deleteButton(deleteItem);
    let container = document.querySelector(`.container${deleteItem}`);
    container.remove();
  });
});

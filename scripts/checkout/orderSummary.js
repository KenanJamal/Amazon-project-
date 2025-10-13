import { cart, deleteButton, updateDeliveryOption } from "../cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utilites/price.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryTime } from "../../data/deliveryTime.js";

const today = dayjs();

let finalHtml = "";
cart.forEach((item) => {
  const ProductId = item.productId;
  let matchingProduct = getProduct(ProductId);

  const selectedOption = deliveryTime.find(
    (element) => element.id === item.deliveryOptionId
  );
  const deliveryDate = today
    .add(selectedOption.deliveryWait || 7, "day")
    .format("dddd, MMM DD");
  let html = `<div class="cart-item-container container${matchingProduct.id}" >
            <div class="delivery-date">Delivery Date: ${deliveryDate}</div>

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
                  <span  data-delete-button ="${
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
  const cartItem = cart.find((element) => element.productId === ProductId);
  deliveryTime.forEach((itemTime, index) => {
    const isChecked = cartItem?.deliveryOptionId === itemTime.id;
    let finaltime = today.add(itemTime.deliveryWait, "day");
    let timeFormat = finaltime.format("dddd, MMM DD");
    let finalTimeMoney =
      itemTime.priceCents === 0
        ? "FREE SHIPPING"
        : formatCurrency(itemTime.priceCents);
    let deliveryId = itemTime.id;
    let final = ` 
                
                <div class="delivery-option js-delivery-option" data-product-id = "${ProductId}" data-delivery-option-id ="${deliveryId}">
                  <input
                    type="radio"
                    ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
                    value = "${deliveryId}"
                    name="delivery-option-${ProductId}"
                    data-thewait = ${itemTime.deliveryWait}
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
document.querySelectorAll(".delivery-option-input").forEach((input) => {
  input.addEventListener("change", () => {
    const parent = input.closest(".js-delivery-option");
    const { productId, deliveryOptionId } = parent.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    const waitDays = input.dataset.thewait;
    const newDate = today.add(waitDays, "day").format("dddd, MMM DD");
    const container = input.closest(".cart-item-container");
    const deliveryDateElement = container.querySelector(".delivery-date");
    deliveryDateElement.innerHTML = `Delivery Date: ${newDate}`;
  });
});

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    let { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});

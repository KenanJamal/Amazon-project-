import { cart, deleteButton, updateDeliveryOption } from "../cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utilites/price.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryTime } from "../../data/deliveryTime.js";
import { renderPaymentSummary } from "./paymentSummary.js";

const today = dayjs();
function displayCartItems() {
  let cartHtml = "";
  cart.forEach((item) => {
    const productId = item.productId;
    let matchingProduct = getProduct(productId);
    const selectedOption = deliveryTime.find(
      (element) => element.id === item.deliveryOptionId
    );
    const deliveryDate = today
      .add(selectedOption.deliveryWait || 7, "day")
      .format("dddd, MMM DD");
    let html = `<div class="cart-item-container container${matchingProduct.id}">
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
              ${displayInputs(productId)}
                </div>

            
              </div>
          </div>
      </div>`;
    cartHtml += html;
  });
  document.querySelector(".order-summary").innerHTML = cartHtml;
}
function deleteItem() {
  document.querySelectorAll(".delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const deleteItem = link.dataset.deleteButton;
      deleteButton(deleteItem);
      let container = document.querySelector(`.container${deleteItem}`);
      container.remove();
      renderPaymentSummary();
    });
  });
}

function displayInputs(productId) {
  let optionsHtml = "";
  deliveryTime.map((option) => {
    const cartItem = cart.find((element) => element.productId === productId);
    const isChecked = cartItem?.deliveryOptionId === option.id;
    let finaltime = today.add(option.deliveryWait, "day");
    let timeFormat = finaltime.format("dddd, MMM DD");
    let price =
      option.priceCents === 0
        ? "FREE SHIPPING"
        : formatCurrency(option.priceCents);
    let html = `
                  <div class="delivery-option js-delivery-option" data-product-id = "${productId}">
                    <input
                      type="radio"
                      class="delivery-option-input"
                      ${isChecked ? "checked" : ""}
                      value = "${option.id}"
                      name="delivery-option-${productId}"
                      data-thewait = ${option.deliveryWait}
                    />
                    <div>
                      <div class="delivery-option-date">${timeFormat}</div>
                      <div class="delivery-option-price">${price}</div>
                    </div>
                  </div>
                  `;
    optionsHtml += html;
  });
  return optionsHtml;
}
function changingInputs() {
  document.querySelectorAll(".delivery-option-input").forEach((input) => {
    input.addEventListener("change", () => {
      let parent = input.closest(".js-delivery-option");
      let optionId = parent.dataset.productId;
      let deliveryOptionId = input.value;
      updateDeliveryOption(optionId, deliveryOptionId);
      const waitDays = input.dataset.thewait;
      const newDate = today.add(waitDays, "day").format("dddd, MMM DD");
      const container = input.closest(".cart-item-container");
      const deliveryDateElement = container.querySelector(".delivery-date");
      deliveryDateElement.innerHTML = `Delivery Date: ${newDate}`;
      renderPaymentSummary();
    });
  });
}
function main() {
  displayCartItems();
  deleteItem();
  changingInputs();
}
main();

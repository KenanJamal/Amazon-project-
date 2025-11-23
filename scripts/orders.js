import { orders } from "../data/orderData.js";
// import { cart } from "./carts/cart.js";
import { formatCurrency } from "./utilites/price.js";
import { getProduct, loadProductsfetch } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

function displayOrders() {
  let finalDisplay = "";
  let html2 = "";
  orders.map((element) => {
    element.products.map((product) => {
      let matchingProduct = getProduct(product.productId);
      html2 += `
           <div class="product-image-container">
             <img src="${matchingProduct.image}" />
           </div>
   
           <div class="product-details">
             <div class="product-name">
              ${matchingProduct.name}
             </div>
             <div class="product-delivery-date">Arriving on: ${dayjs(
               product.estimatedDeliveryTime
             ).format("MMMM D")}</div>
             <div class="product-quantity">Quantity: ${product.quantity}</div>
             <button class="buy-again-button button-primary js-buyItAgain">
               <img class="buy-again-icon" src="images/icons/buy-again.png" />
               <span class="buy-again-message">Buy it again</span>
             </button>
           </div>
   
           <div class="product-actions">
             <a href="tracking.html">
               <button class="track-package-button button-secondary">
                 Track package
               </button>
             </a>
           </div>
       `;
    });
    let html1 = `<div class="order-container">
         <div class="order-header">
           <div class="order-header-left-section">
             <div class="order-date">
               <div class="order-header-label">Order Placed:</div>
               <div>${dayjs(element.orderTime).format("MMMM D")}</div>
             </div>
             <div class="order-total">
               <div class="order-header-label">Total:</div>
               <div>${formatCurrency(element.totalCostCents)}</div>
             </div>
           </div>
   
           <div class="order-header-right-section">
             <div class="order-header-label">Order ID:</div>
             <div>${element.id}</div>
           </div>
         </div>
         <div class="order-details-grid">${html2}</div>
        `;
    finalDisplay += html1;
  });
  document.querySelector(".orders-grid").innerHTML = finalDisplay;
}
async function main() {
  await loadProductsfetch();
  displayOrders();
  buyItAgain();
}
main();

import { orders } from "../data/orderData.js";
import { getProduct, loadProductsfetch } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
function displayTracking() {
  let url = new URL(window.location.href);
  let orderId = url.searchParams.get("orderId");
  let product = getProduct(url.searchParams.get("productId"));
  let theSelectedOrder = orders.find((element) => element.id === orderId);
  let theSelectedProduct = theSelectedOrder.products.find(
    (element) => element.productId === product.id
  );
  let html = `<div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">${dayjs(
          theSelectedProduct.estimatedDeliveryTime
        ).format("MMMM,  DD")}</div>

        <div class="product-name">${product.name}</div>

        <div class="product-quan">Quantity: ${theSelectedProduct.quantity}</div>

        <img
          class="product-image"
          src="${product.image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>`;
  document.querySelector(".main").innerHTML = html;
}
async function main() {
  await loadProductsfetch();
  displayTracking();
}
main();

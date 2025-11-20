import { mainSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/backend-practise.js";
import { loadProductsfetch } from "../data/products.js";
async function checkOut() {
  await loadProductsfetch();
  mainSummary();
  renderPaymentSummary();
}
checkOut();

import { mainSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import "../data/backend-practise.js";
import { loadProducts } from "../data/products.js";
loadProducts(() => {
  mainSummary();
  renderPaymentSummary();
});

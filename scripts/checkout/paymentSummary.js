import { cart } from "../cart.js";
import { getProduct } from "../../data/products.js";
import { deliveryTime } from "../../data/deliveryTime.js";
import { formatCurrency } from "../utilites/price.js";

function renderPaymentSummary() {
  let productPriceCent = 0;
  let matchingProduct;
  let ShippingPrice = [];

  cart.forEach((item) => {
    const ProductId = item.productId;
    matchingProduct = getProduct(ProductId);
    productPriceCent += matchingProduct.priceCents * item.quantity;
    const selectedOption = deliveryTime.find(
      (element) => element.id === item.deliveryOptionId
    );

    ShippingPrice.push(selectedOption.priceCents);
  });

  const sumWithInitial = ShippingPrice.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const finalShippingPrice = sumWithInitial;
  const totalBeforeTax = finalShippingPrice + productPriceCent;
  const estimatedTax = totalBeforeTax / 10;
  const orderTotal = estimatedTax + totalBeforeTax;
  const paymentSummaryHtml = `
       
          <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">${formatCurrency(
              productPriceCent
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatCurrency(
              finalShippingPrice
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${formatCurrency(
              totalBeforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(
              estimatedTax
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatCurrency(
              orderTotal
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;
  document.querySelector(".payment-summary").innerHTML = paymentSummaryHtml;
}
renderPaymentSummary();

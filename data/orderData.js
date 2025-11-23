export const orders = JSON.parse(localStorage.getItem("order")) || [];

export function addToOrders(order) {
  orders.unshift(order);
  saveToStorage();
}
function saveToStorage() {
  localStorage.setItem("order", JSON.stringify(orders));
}

export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
  },
];

export function addToCart(productId) {
  let matchingItem = cart?.filter((item) => item.productId === productId);
  if (matchingItem.length > 0) {
    matchingItem[0].quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
}

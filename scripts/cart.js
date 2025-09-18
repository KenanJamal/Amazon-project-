export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
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

export function deleteButton(Id) {
  cart = cart.filter((cartItem) => cartItem.productId !== Id);
}

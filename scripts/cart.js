let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 2,
      deliveryOptionId: "2",
    },
  ];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCart(productId) {
  let matchingItem = cart?.filter((item) => item.productId === productId);
  if (matchingItem.length > 0) {
    matchingItem[0].quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

function deleteButton(Id) {
  cart = cart.filter((cartItem) => cartItem.productId !== Id);
  saveToStorage();
}
function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((element) => {
    if (productId === element.productId) {
      matchingItem = element;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export { cart, deleteButton, saveToStorage, addToCart, updateDeliveryOption };

class Cart {
  cartItems;
  #localStoragekey;
  constructor(localStoragekey) {
    this.#localStoragekey = localStoragekey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStoragekey));
    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ];
    }
  }
  saveToStorage() {
    localStorage.setItem(this.#localStoragekey, JSON.stringify(this.cartItems));
  }
  addToCart(productId) {
    let matchingItem = this.cartItems?.find(
      (item) => item.productId === productId
    );
    if (matchingItem) {
      matchingItem.quantity++;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: "1",
      });
    }
    this.saveToStorage();
  }
  deleteButton(Id) {
    this.cartItems = this.cartItems.filter(
      (cartItem) => cartItem.productId !== Id
    );
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.map((element) => {
      if (productId === element.productId) {
        matchingItem = element;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
}
let cart = new Cart("cart-class");

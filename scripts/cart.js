export let cart = [];

export  function addToCart(productId){
    let matchingItem = cart?.filter((item)=>item.productId === productId);
    if( matchingItem.length > 0){
        matchingItem[0].quantity++;
    }else {
        cart.push({
            productId : productId,
            quantity : 1
        })
    }
}

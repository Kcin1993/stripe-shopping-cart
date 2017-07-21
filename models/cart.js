 module.exports = function Cart(oldCart) { //For the || operation is for the oldCart is undefined, prevent from follow function operation with undefined and cause issue
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function(item, id) { //Same productId with multiple quantity
    var storedItem = this.items[id];
    if(!storedItem) {
      storedItem = this.items[id] = {item: item, qty: 0, price: 0}
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  };

  this.generateArray = function() { //List of product group
    var arr = [];
    for(var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
}
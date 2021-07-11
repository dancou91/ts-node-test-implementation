export class Cart {

    private _cartId: string;
    private _items: CartItem[];
    private _totalAmount: number;

    constructor(cartId: string, items = [], totalAmount = 0) {
        this._cartId = cartId;
        this._items = items;
        this._totalAmount = totalAmount;
    }

    public get cartId() {
        return this._cartId;
    }

    public get totalAmount() {
        return this._totalAmount;
    }

    public addCartItem(productCode: string, quantity: string, price: number) {
        this._items = [...this._items, new CartItem(productCode, quantity, price)];
        this._totalAmount = this._items.reduce((total, cartItem) => total + cartItem.price, 0);
    }
}

class CartItem {

    private _productCode;
    private _quantity;
    private _price;

    constructor(productCode: string, quantity: string, price: number) {
        this._productCode = productCode;
        this._quantity = quantity;
        this._price = price;
    }

    public get productCode() {
        return this._productCode;
    }

    public get quantity() {
        return this._quantity;
    }

    public get price() {
        return this._price;
    }
}
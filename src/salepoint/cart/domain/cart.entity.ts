import { CartItem } from "./cart-item";

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

    public addCartItem(productCode: string, price: number): void {

        const cartItem = this._items.find(cartItem => cartItem.productCode === productCode);

        if (cartItem) {
            cartItem.increaseQuantity()
        } else {
            this._items.push(new CartItem(productCode, price));
        }

        this._calculateTotalAmount();
    }

    private _calculateTotalAmount(): void {
        this._totalAmount = this._items.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
    }
}
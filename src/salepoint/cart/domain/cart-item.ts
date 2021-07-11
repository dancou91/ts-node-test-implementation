export class CartItem {

    private _productCode;
    private _price;
    private _quantity;

    constructor(productCode: string, price: number) {
        this._productCode = productCode;
        this._price = price;
        this._quantity = 1;
    }

    public get productCode() {
        return this._productCode;
    }

    public get price() {
        return this._price;
    }

    public get quantity() {
        return this._quantity;
    }

    public increaseQuantity(): void {
        this._quantity++;
    }
}
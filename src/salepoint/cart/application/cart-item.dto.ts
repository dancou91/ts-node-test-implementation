export class CartItemDTO {

    constructor(
        private productCode: string,
        private price: number,
        private quantity: number
    ) { }

    getProductCode() {
        return this.productCode;
    }

    getPrice() {
        return this.price;
    }

    getQuantity() {
        return this.quantity;
    }

    setQuantity(quantity: number) {
        this.quantity = quantity;
    }
}
export class ProductNotFoundException extends Error {
    constructor(msg: string = 'Product not found exception') {
        super(msg);
    }
}
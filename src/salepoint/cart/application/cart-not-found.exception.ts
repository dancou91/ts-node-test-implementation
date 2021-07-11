export class CartNotFoundException extends Error {
    constructor(msg: string = 'Cart not found exception') {
        super(msg);
    }
}
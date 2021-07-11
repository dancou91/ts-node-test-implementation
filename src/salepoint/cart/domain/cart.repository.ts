import { Cart } from "../domain/cart.entity";

export interface CartRepository {

    search(cartId: string): Cart | null;
    save(cart: Cart): void;
    
}
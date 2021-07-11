export class Product {

    private _code: string;
    private _name: string;
    private _price: number;

    constructor(code: string, name: string, price: number) {
        this._code = code;
        this._name = name;
        this._price = price;
    }

    public static create(
        code: string,
        name: string
    ): Product {
        let category = new this(code, name, 0);
        return category;
    }
}
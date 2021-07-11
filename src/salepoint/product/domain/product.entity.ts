export class Product {

    private _code: string;
    private _name: string;
    private _price: number;

    constructor(code: string, name: string, price: number) {
        this._code = code;
        this._name = name;
        this._price = price;
    }

    public get code() {
        return this._code;
    }

    public get name() {
        return this._name;
    }

    public get price() {
        return this._price;
    }
}
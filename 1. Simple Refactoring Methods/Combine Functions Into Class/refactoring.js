class Product {

    constructor(name, description, price) {
        this._name = name;
        this._description = description;
        this._price = price;
    }

    get name () {
        return this._name;
    }

    get description () {
        return this._description;
    }

    get price () {
        return this._price;
    }

    set name (name) {
        this._name = name;
    }

    set description (description) {
        this._description = description;
    }

    set price (price) {
        this._price = price;
    }

    calculateTax () {
        if (product.price < 5) {
            this.#calculateBaseTax(product);
        } else if(product.price < 10) {
            this.#calculateMediumTax(product);
        } else {
            this.#calculateHighTax(product);
        }
    }

    #calculateBaseTax () {
        const taxPercentage = 0.1;
        this._price = this._price + this._price * taxPercentage;
    }
    
    #calculateMediumTax () {
        const taxPercentage = 0.2;
        this._price = this._price + this._price * taxPercentage;
    }
    
    #calculateHighTax () {
        const taxPercentage = 0.3;
        this._price = this._price + this._price * taxPercentage;
    }
}
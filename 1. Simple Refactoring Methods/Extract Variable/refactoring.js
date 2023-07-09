const order = [
    {
        productName: 'Product 1',
        quantity: 20,
        pricePerItem: 12.12
    },
    {
        productName: 'Product 2',
        quantity: 50,
        pricePerItem: 6.25
    },
    {
        productName: 'Product 3',
        quantity: 200,
        pricePerItem: 15.50
    }
];

class Product {

    constructor({ productName, quantity, pricePerItem }) {
        this._productName = productName;
        this._quantity = quantity;
        this._pricePerItem = pricePerItem;
    }

    get total () {
        return this.basePrice + this.discount + this.shippingPrice;
    }

    get basePrice () {
        return this._pricePerItem * this._quantity;
    }

    get discount () {
        return Math.max(0, this._pricePerItem - 100) * 0.05;
    }

    get shippingPrice () {
        return Math.min(this._quantity * 0.01, 100);
    }
}

class Order {
    constructor(products) {
        this._products = products;
        this._total = 0;
        this.#mapInProductObjects();
    }

    get total() {
        this.#getTotalPriceForEachProduct();
        return this._total;
    }

    #mapInProductObjects = function () {
        this._products = this._products.map((product) => new Product(product));
    }

    #getTotalPriceForEachProduct = function () {
        this._products.forEach((product) => this._total += product.total);
    }
}

console.log(new Order(order).total);
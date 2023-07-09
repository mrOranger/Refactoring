const order = [
    {
        productName : 'Product 1',
        quantity : 20,
        pricePerItem : 12.12
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
        return this._pricePerItem * this._quantity
            + Math.max(0, this._pricePerItem - 100) * 0.05
            + Math.min(this._quantity * 0.01, 100);
    }
}

class Order {
    constructor(products) {
        this._products = products;
        this._total = 0;
        this._products = this._products.map((product) => new Product(product));
    }

    get total () {
        this._products.forEach((product) => this._total += product.total);
        return this._total;
    }
}

console.log(new Order(order).total);
# Extract Variable
Spesso, abbiamo a che fare con variabili composte, e non riusciamo a capire come siano state effettivamente messe insieme le parti che la compongono. Estrarre le singole parti di una variabile ed inserirle all'interno di variabili separate (spesso immutabili), è una buona pratica per far comprendere a chi sta leggendo il codice, la composizione e la logica della variabile stessa.

Seguendo questo ragionamento, il metodo __Extract Variable__ non fa altro che estrarre le componento di una variabile ed inserirle in variabili separate, come accade per la figura sotto:
![](/1.%20Simple%20Refactoring%20Methods/Extract%20Variable/Extract%20Variable.svg)

## Problema

Considerando il codice inserito all'interno del file [bad.js](/1.%20Simple%20Refactoring%20Methods/Extract%20Variable/bad.js), possiamo vedere come nella classe _Product_ ci sia un metodo che restituisce il prezzo totale di un prodotto, ma non si capisce bene come questo venga calcolato:

```javascript
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
```
possiamo però estrarre le varie parti che compongono il totale, ed inserirle all'interno di altre variabili, che ne descrivono il contenuto.

## Soluzione
Ecco quindi che nel file [refactoring.js](/1.%20Simple%20Refactoring%20Methods/Extract%20Variable/refactoring.js), le parti che compongono il totale vengono inserite in tre variabili diverse, rispettivamente, per il prezzo complessivo, lo sconto applicato e le spese di spezione:
```javascript

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
```

Infine, per rendere più compresibile anche il condenuto della classe _Order_ è stato applicato il metodo __Extract Function__ per separare le varie funzionalità che vengono usate all'interno della classe:
```javascript
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
```
# Extract Function
Il metodo _Extract Function_ consiste letterlamente nell'estrarre da un blocco di codice una funzionalità, ed inserirla quindi in un altra funzione, come descritto nella figura.
![Extract Function](/1.%20Simple%20Refactoring%20Methods/Extract%20Function/Extract%20Function.svg)
Ora, estrarre una funzionalità per inserirla in una nuova funzione, ha un duplice scopo. Per prima cosa aumentiamo la leggibilità del codice in quanto separando concettualmente le responsabilità possiamo assegnare ad ognuna di queste un nome preciso, rendendo quindi chiaro quali siano le operazioni che vengono compiute all'interno di un blocco di codice. In seconda luogo, e pochi lo sanno, estrarre una funzionalità ed inserirla in una funzione più piccola possibile, aumenta la velocità,(anche se parliamo di un fattore trascurabile) in quanto piccole funzioni vengono più facilmente messe all'interno della cache della CPU.

Per decidere quando effettivamente applicare questo metodo, ci si può basare su alcune indicazioni:
* Potremmo dire che se una funzione svolge più compiti contemporaneamente, allora sarebbe bene dividere questa in sotto-funzioni, che svolgano compiti diversi, ed incapsulino logiche diverse.
* Indicativamente, se una funzione o un metodo risulta essere molto lungo (il concetto di molto lungo è arbitrario, ma tipicamente non si dovrebbero superare le 12 rghe per funzione), allora è bene applicare qesta rifattorizzazione.
## Problema
Nell'esempio che è descritto nel file [bad.js](/1.%20Simple%20Refactoring%20Methods/Extract%20Function/bad.js), abbiamo un'unica funzione che svolge diversi compiti: 
```javascript

    let total = 0;
    for(let sale of sales) {
        total += sale.cost;
    }

    let quantitiesForProduct = [];
    for(let i = 0; i < sales.length; i++) {
        let found = false;
        for(let j = 0; j < quantitiesForProduct.length; j++) {
            if(quantitiesForProduct[j].product == sales[i].product) {
                quantitiesForProduct[j].quantity++;
                found = true
            }
        }
        if(!found) {
            quantitiesForProduct.push({
                product : sales[i].product,
                quantity : 1
            });
        }
    }

    let mostSoldProductIndex = 0;
    let mostSoldQuantity = 0;
    for(let i = 0; i < quantitiesForProduct.length; i++) {
        if(mostSoldQuantity < quantitiesForProduct[i].quantity) {
            mostSoldQuantity = quantitiesForProduct[i].quantity;
            mostSoldProductIndex = i;
        }
    }

    return {
        mostSoldProduct : {
            name: sales[mostSoldProductIndex].product,
            quantity: mostSoldQuantity,
            total: mostSoldQuantity * sales[mostSoldProductIndex].cost
        },
        soldProductsWithQuantities : quantitiesForProduct,
        total : total
    };
```
e tra questi possiamo individuare:
* Calcolo del __totale__ di una vendita.
* Calcolo delle __quantità totali__ vendute per ogni singolo prodotto, inserito nel registro delle vendite.
* Calcolo del __prodotto più venduto__ e delle quantità ad esso associate.
* Infine, la __creazione__ dell'oggetto che rappresenta il Report delle vendite.
## Soluzione
Sulla base delle funzionalità individuate, procediamo a rifattorizzare applicando il metodo dell' __Extract Function__. La funzione rifattorizzata che risulterà essere l'output di questo processo è la seguente:
```javascript
function printReport (sales) {
    const total = calculateTotal(sales);
    const quantitiesForProduct = calculateQuantityForProduct(sales);
    const mostSoldProduct = getMostSoldProductWithQuantity(quantitiesForProduct);
    return encapsulateReport(sales, total, quantitiesForProduct, mostSoldProduct);
}
```
ed ad un primo sguardo possiamo notare come sia già molto più leggibile. Le funzionalità sono ben separate, e se ne volessimo modificare una, bastarebbe accedere al metodo di interesse. 

Per la prima funzionalità estratta, è stato fatto un semplice copia ed incolla del codice precedente, andando a creare il metodo seguente:
```javascript
function calculateTotal (sales) {
    let total = 0;
    for (let sale of sales) {
        total += sale.cost;
    }
    return total;
}
```
Il calcolo delle quantità per prodotto, ha richieso invece un'analisi più dettagliata, in quanto sono coinvolte in questo altre sotto-funzionalità che è stato deciso bene di dividere dalla funzione principale:
```javascript
function calculateQuantityForProduct (sales) {
    let quantitiesForProduct = [];
    for (let i = 0; i < sales.length; i++) {
        getQuantityOfProduct(sales[i].product, quantitiesForProduct);
    }
    return quantitiesForProduct;
}


function getQuantityOfProduct (productName, quantitiesForProduct) {
    let found = false;
    for (let j = 0; j < quantitiesForProduct.length; j++) {
        if (productFound(quantitiesForProduct[j].product, productName)) {
            found = updateProductQuantityAndFlag(quantitiesForProduct[j]);
        }
    }
    if (!found) {
        addNewQuantityForProduct(quantitiesForProduct, productName);
    }
}

function productFound(currentProductName, productName) {
    return currentProductName == productName;
}

function updateProductQuantityAndFlag (product) {
    product.quantity++;
    return true;
}

function addNewQuantityForProduct(quantitiesForProduct, productName) {
    quantitiesForProduct.push({
        product: productName,
        quantity: 1
    });
}
```
La funzione _calculateQuantityForProduct_ esegue un calcolo per ogni prodotto presente all'interno del registro, richiamando la funzione _getQuantityOfProduct_ che inserisce all'interno dell'array delle quantità per prodotto, un oggetto che indica il nome del prodotto e la quantità, se questo non è presente, attraverso il metodo _addNewQuantityForProduct_ altrimenti modifica la quantità di quello già esistente con _updateproductQuantityAndFlag_. Estrarre la condizione del blocco-if all'interno di una funzione _productFound_, ha lo scopo di rendere il primo più leggibile.

Successivamente, per calcolare il prodotto più venduto ci affidiamo anche in questo caso ad una nuova funzione chiamata _getMostSoldProductWithQuantity_, che esegue una ricerca all'interno dell'array dei prodotti venduti, e verifica se quello corrente è o no il più venduto usando il metodo _shallUpdateMostSoldProductQuantity_:
```javascript 
function getMostSoldProductWithQuantity (quantitiesForProduct) {

    let mostSoldProductIndex = 0;
    let mostSoldQuantity = 0;

    for (let i = 0; i < quantitiesForProduct.length; i++) {
        if (shallUpdateMostSoldProductQuantity(mostSoldQuantity, quantitiesForProduct[i].quantity)) {
            mostSoldProductIndex = i;
            mostSoldQuantity = quantitiesForProduct[i].quantity;
        }
    }

    return {
        index : mostSoldProductIndex,
        quantity : mostSoldQuantity
    };
}

function shallUpdateMostSoldProductQuantity (actualMostSoldQuantity, newMostSoldQuantity) {
    return actualMostSoldQuantity < newMostSoldQuantity;
}
```
Infine, l'ultima funzionalità consiste nel restituire l'oggetto report, ed anche in questo caso è un semplice copia-incolla del codice già presente:
```javascript
function encapsulateReport (sales, total, quantitiesForProduct, mostSoldProduct) {
    return {
        mostSoldProduct: {
            name: sales[mostSoldProduct.index].product,
            quantity: mostSoldProduct.quantity,
            total: mostSoldProduct.quantity * sales[mostSoldProduct.index].cost
        },
        soldProductsWithQuantities: quantitiesForProduct,
        total: total
    };
}
```
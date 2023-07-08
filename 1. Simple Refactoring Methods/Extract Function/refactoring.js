function printReport (sales) {
    const total = calculateTotal(sales);
    const quantitiesForProduct = calculateQuantityForProduct(sales);
    const mostSoldProduct = getMostSoldProductWithQuantity(quantitiesForProduct);
    return encapsulateReport(sales, total, quantitiesForProduct, mostSoldProduct);
}

function calculateTotal (sales) {
    let total = 0;

    for (let sale of sales) {
        total += sale.cost;
    }

    return total;
}

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

const sales = [
    {
        product: 'Product 1',
        cost: 12.25
    },
    {
        product: 'Product 2',
        cost: 8.90
    },
    {
        product: 'Product 1',
        cost: 12.25
    }
];

printReport(sales);
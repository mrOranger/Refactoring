const sales = [
    {
        product : 'Product 1',
        cost : 12.25
    },
    {
        product : 'Product 2',
        cost : 8.90
    },
    {
        product : 'Product 1',
        cost : 12.25
    }
];

function printReport (sales) {

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
}

printReport(sales);
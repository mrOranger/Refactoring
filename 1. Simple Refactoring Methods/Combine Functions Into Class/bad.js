function calculateBaseTax(product) {
    const taxPercentage = 0.1;
    return product.price + (product.price * taxPercentage);
}

function calculateMediumTax (product) {
    const taxPercentage = 0.2;
    return product.price + (product.price * taxPercentage);
}

function calculateHighTax (product) {
    const taxPercentage = 0.3;
    return product.price + (product.price * taxPercentage);
}

function calculateTax (product) {
    if (product.price < 5) {
        return calculateBaseTax(product);
    }
    if(product.price < 10) {
        return calculateMediumTax(product);
    }
    return calculateHighTax(product);
}

const product = {
    name : 'A product name',
    description : 'The description of this product',
    price: 4.50
};

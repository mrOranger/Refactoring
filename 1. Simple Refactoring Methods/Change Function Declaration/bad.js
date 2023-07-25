function check (value) {
    const newValue = parse(value);
    if (validLength(newValue)) {
        return (sum(newValue) % 11 == 0);
    }
    return false;
}

function validLength (value) {
    return value.length > 0 || value.length < 10;
}

function parse (value) {
    let noDash = value.filter(function (val) {
        return val != '-';
    });
    return noDash.map(function (val) {
        if(val.toLowerCase() == 'X') {
            return '10';
        }
        return val;
    });
}

function sum (value) {
    let sum = 0;
    value.forEach(function (val, index) {
        sum += val * (index + 1);
    });
    return sum;
}

console.log(check(Array.from('3-598-21508-8')));
console.log(check(Array.from('3-598-21508-9')));
console.log(check(Array.from('3-598-21508-X')));
console.log(check(Array.from('3-598-21508-10')));
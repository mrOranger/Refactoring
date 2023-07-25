function checkISBNCode (ISBNCodeString) {
    const parsedISBNCodeString = parseISBNCode(ISBNCodeString);
    if(validLength(parsedISBNCodeString)) {
        return computeISBNValidity(parsedISBNCodeString);
    }
    return false;
}

function validLength (value) {
    return value.length > 0 || value.length < 10;
}

function parseISBNCode (ISBNCodeString) {
    const parsedISBNCodeString = removeDashCharacters(ISBNCodeString);
    return convertXCharacterToNumber(parsedISBNCodeString);
}

function removeDashCharacters (ISBNCodeString) {
    return ISBNCodeString.filter(isNotADash);
}

function isNotADash (ISBNCharacter) {
    return ISBNCharacter != '-';
}

function convertXCharacterToNumber (ISBNCodeString) {
    return ISBNCodeString.map(mapCharactersToNumbers);
}

function mapCharactersToNumbers (ISBNCharacter) {
    return (isAnXCharacter(ISBNCharacter) ? '10' : ISBNCharacter);
}

function isAnXCharacter (ISBNCharacter) {
    return ISBNCharacter.toLowerCase() == 'X';
}

function computeISBNValidity (ISBNCodeString) {
    return (ISBNCodeString.map(mapISBNCodeInPowerOfIndex)
        .reduce(sum, 0)
         % 11) == 0;
}

function mapISBNCodeInPowerOfIndex (ISBCodeChar, index) {
    return ISBCodeChar * (index + 1); 
}

function sum (accumulator, valueToSum) {
    return accumulator + valueToSum;
}

console.log(checkISBNCode(Array.from('3-598-21508-8')));
console.log(checkISBNCode(Array.from('3-598-21508-9')));
console.log(checkISBNCode(Array.from('3-598-21508-X')));
console.log(checkISBNCode(Array.from('3-598-21508-10')));
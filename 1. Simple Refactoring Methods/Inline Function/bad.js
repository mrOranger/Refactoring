function login(username, password) {
    const usernameValidated = validateUsername(username);
    const passwordValidated = validatePassword(password);
    if (usernameValidated && passwordValidated) {
        return 'Sei autenticato!';
    } else {
        return 'Non sei autenticato!';
    }  
}  

function validateUsername (username) {
    return username != null;
}

function validatePassword (password) {
    return password != null;
}

console.log(login('Mario', 'Rossi'));
console.log(login(null, 'Rossi'));
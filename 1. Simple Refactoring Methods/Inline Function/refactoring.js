function login(username, password) {
    if ((username != null) && (password != null)) {
        return 'Sei autenticato!';
    } else {
        return 'Non sei autenticato!';
    }
}
console.log(login('Mario', 'Rossi'));
console.log(login(null, 'Rossi'));
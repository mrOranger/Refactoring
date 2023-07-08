# Inline Function
Il metodo di _Inline Function_ potrebbe essere considerato l'opposto di _Extract Function_, ma non è esattamente così. Se fosse invece l'esatto opposto, allora questo implica che è sufficiente copiare ed incollare il contenuto di una funzione al di fuori di questo per ottenere lo stesso risultato, ma non si fanno i conti successivamente con le variabili locali e meglio ancora per l'espressività del contenuto di un metodo rispetto al nome del primo.

Infatti, è buona norma utilizzare questa tecnica quando il corpo di una funzione o di un metodo, è più espressivo del nome di quest'utilimo, oppure, in maniera analoga, potrebbe risultare superfluo inserire un'elaborazione così semplice all'interno di un metodo.

## Problema
Consideriamo il codice espresso nel file [bad.js](/1.%20Simple%20Refactoring%20Methods/Inline%20Function/bad.js):

```javascript
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
```
In questo caso, sembra inituile utilizzare due metodi per verificare se effettivamente le variabili _username_ e _password_ siano non nulle. Infatti, la stessa comparazione specifica già in maniera adeguata la logica del corpo della funzione, senza necessitare che la prima sia quindi inserita all'interno di una funzione.

## Soluzione
La soluzione è quindi estrarre il corpo delle due funzioni, ed inserirle direttamente all'interno della condizione del blocco-if:
```javascript
function login(username, password) {
    if ((username != null) && (password != null)) {
        return 'Sei autenticato!';
    } else {
        return 'Non sei autenticato!';
    }
}
```
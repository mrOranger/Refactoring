# Combine Functions Into Class
Il primo linguaggio che studia per la prima volta fu il caro vecchio C, e forse molti di voi come me, avranno iniziato la loro carriera proprio da quel linguaggio.

Per chi non lo conoscesse, il C è un linguaggio del secolo scorso, ancora molto utilizzati in applicazione embedded, e da cui sono derivati gran parte dei linguaggi moderni. E'un linguaggio imperativo ma non orientato agli oggetti.

Quando inizai a sviluppare in C, raggruppavo in maniera naturale le funzioni all'interno di file diversi. E'stata la prima regola di refactoring che ho incosapevolmente imparato, ed spesso è proprio una che ci si dimentica spesso.

## Problema
Analizziamo ciò che è contenuto nel file [bad.js](./bad.js):
```javascript
function calculateBaseTax (product) {
    ...
}

function calculateMediumTax (product) {
    ...
}

function calculateHighTax (product) {
    ...
}

function calculateTax (product) {
    ...
}
```
in cui abbiamo praticamente quattro funzioni che fanno fondamentalmente una cosa simile, e che a questo punto varrebbe la pena inserire all'interno di uno stesso _componente_. 

Ho voluto intenzionalmente usare il termine _componente_, in quanto non necessariamente tutti i linguaggi di programmazione possiedono il concetto di classe, ma alcuni come il linguaggio C, invece, possono raggruppare le funzioni solamente all'interno di file.

La cosa che però dovrebbe più di tutte farci comprendere che vale la pena applicare questo metodo di rifattorizzazione, non è tanto il fatto che concettualmente le funzioni facciano una cosa simile (sebbene questo sia fondamentale per raggruparle), ma anche che queste condividono tra loro un parametro molto simile.

## Soluzione
Quindi, per quanto semplice sia, la soluzione al nostro problema è raggruppare queste funzioni in un'unica classe, come mostrato nel file [refactoring.js](./refactoring.js).

```javascript 

class Product {

    constructor(name, description, price) {
        ...
    }

    calculateTax () {
        ...
    }

    #calculateBaseTax () {
        ...
    }
    
    #calculateMediumTax () {
        ...
    }
    
    #calculateHighTax () {
        ...
    }
}
```
oltre a questo, ho preferito rendere anche le altre funzioni richiamate dal metodo __calculateTax__, visibili solamente all'interno della classe stessa, sfruttando il principio dell'__incapsulamento__, in quanto concettualmente non devono importare a chi risiede al di fuori della classe.
# Change Function Declaration 
Le funzioni sono il cuore di ciascun programma software, che permettono di astrarre una soluzione dividendola e rendendola più praticabile. E' ovvio quindi che conoscere bene cosa faccia una funzione, è obbligatorio per comprendere il funzionamento del software.

Spesso però, riuscire a capire cosa effettivamente faccia una funzione è un problema, in quanto il codice è scritto in maniera troppo articolata, o usando dei meccanismi specifici di un linguaggio. Ecco che in questo caso, ci viene in aiuto il __nome__ della funzione, che oltre ad indentificare questa, è il primo elemento di documentazione che abbiamo a disposizione.

In passato, ho visto spesso progetti che avevano funzioni con accompagnato un commento che ne spiegasse il comportamento. Un'ottima tecnica, ma secondo me in alcuni casi si più fare di meglio, in quanto sono convito che un buon nome, riesca a spiegare meglio il comportamento di una funzione, più di quanto possa fare un commento attaccato a questa. La tecnica che consiste nel cambiare il nome di una funzione, è chiamata __Change Function Declaration__ o anche nota come __Rename Function__. Sebbene sembri una tecnica semplice, in realtà diventa più complicato applicarla, quanto il codice cresce il complessità. Ci sono però degli IDE che permettono di automatizzare questo processo, e qualora non fosse possibile, si può applicare insieme alla logica della _migrazione_ che vedremo nell'esempio successivo.

Per spiegare bene questa tecnica, cerchiamo di risolvere questo esercizio:

> Un Codice ISBN è un codice identificativo a 10 numeri, ad eccezione dell'ultimo che può essere una X rappresentante il numero 10, e che identifica univocamente un libro. Può includere diversi '-', ed è valido se e soltato se la somma dei numeri, ciascuno moltiplicato per il proprio indice (partendo da 0), è un numero divisibile per 11. 

> Scrivere quindi un programma che preso un codice ISBN, ne verifichi la validità, considerando che 3-598-21508-8 è un codice valido. 

## Problema
Per prima cosa, analizziamo la funzione principale del programma contenuto in [bad.js](/1.%20Simple%20Refactoring%20Methods/Change%20Function%20Declaration/bad.js):

```javascript
function check (value) {
    const newValue = parse(value);
    if (validLength(newValue)) {
        return (sum(newValue) % 11 == 0);
    }
    return false;
}
```
La funzione è chiamata _check_, ma cosa sta verificando esattamente? Senza sapere nulla su cosa effettivamente faccia, direi a prima vista che verifica la somma dei valori di qualcosa chiamato _value_. Non è sufficiente quindi a farmi comprendere che la funzione verifichi la validità di un codice ISBN, per prima cosa direi di cambiare il nome in uno più intutivo come _checkISBNCode_, ed aggiungerei anche di cambiare il nome del parametro, in quanto _value_, non è di immediata comprensione, in questo caso suggerirei _ISBNCodeString_. 

Aggiungo il suffisso _String_, perché essendo Javascript un linguaggio a tipizzazione debole, non ho idea di che tipo sia quel codice ISBN, se un array, una stringa, o altro.

Notiamo anche la presenza di una chiamata ad una funzione _parse_, che si suppone esegua qualche operazione sul nostro parametro, restituendone uno nuovo sulla base di alcune regole. Ma quali sono queste regole?

```javascript
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
```
Diciamo che sembra senza entrare nel dettaglio che la funzione rimuova i caratteri '-', e converta il carattere 'X' nel valore 10, ma questo è lasciato intendere al lettore.

Inoltre, vediamo che la funzione restituisca il risultato della funzione _sum_, che a primo acchito, direi che non fa altro che calcolare la somma dei valori del parametro. Ma se vediamo il corpo della funzione:

```javascript
function sum (value) {
    let sum = 0;
    value.forEach(function (val, index) {
        sum += val * (index + 1);
    });
    return sum;
}
```
In realtà esegue un'operazione un po' più complicata che la semplice somma. 

## Soluzione

Il codice che è stato prodotto nel file [refactoring.js](/1.%20Simple%20Refactoring%20Methods/Change%20Function%20Declaration/refactoring.js), alla fine è risultato più lungo di 19 righe, e mi limiterò a commentare per il momento le parti salienti, lasciando i dettagli su funzioni tipiche di javascript alla documentazione ufficiale. Partiamo quindi dalla funzione principale che adesso è diventata:
```javascript
function checkISBNCode (ISBNCodeString) {
    const parsedISBNCodeString = parseISBNCode(ISBNCodeString);
    if(validLength(parsedISBNCodeString)) {
        return computeISBNValidity(parsedISBNCodeString);
    }
    return false;
}
```
Per prima cosa notiamo che la funzione _parse_ adesso si chiama più appropriatamente _parseISBNCode_, ad indicare che esegue operazioni di modifica solo su un codice ISBN, ed inoltre, il risultato che è derivato, si chiama più appropriatamente, _parsedISBNCodeString_. La funzione _parseISBNCode_ è stata ridotta alle sue operazioni principali ossia:
```javascript
function parseISBNCode (ISBNCodeString) {
    const parsedISBNCodeString = removeDashCharacters(ISBNCodeString);
    return convertXCharacterToNumber(parsedISBNCodeString);
}
```
* La rimozione dei caratteri '-', _removeDashCharacters_.
* La conversione del carattere speciale 'X' nel numero 10, _convertXCharacterToNumber_.

dove i nomi delle funzioni sembrano parlare esplicitamente su quello che fanno in pratica le funzioni. 

Infine, abbiamo la funzione _computeISBNValidity_:
```javascript
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
```
che da come vediamo, per prima cosa converte ogni carattere, nella potenza del proprio indice (so che non è matematicamente corretto, ma non sono riuscito a fare di meglio). Ed inoltre, calcola la somma delle potenze, partendo dal valore 0, ed infine assicurandosi che la somma sia un multiplo di 11. 
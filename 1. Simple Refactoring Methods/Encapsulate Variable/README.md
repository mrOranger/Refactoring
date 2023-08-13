# Encapsulate Variable
Un programma con delle variabili globali è spesso causa di problemi durante la rifattorizzazione, spesso vogliamo poter unificare le modalità con le quali si accedono alle variabili se questi sono oggetti. Il metodo che ci permette quindi di unificare gli accessi, evitando la duplicazione di codice, è chiamato __Encapsulate Variable__, e diversamente da quanto può sembrare, non consiste solamente nell'inserire la variabile all'interno di una classe, definendone i metodi che accedono ai campi, maè possibile applicare questo metodo usando diverse tecniche. 

Il metodo più conosciuto per rifattorizzare una variabile con questa tecnica, unificandone l'accesso, consiste nel definire separatamente i metodi che permettono l'accesso alla variabile, e rendendo quest'ultima privata e non accessibile da tutto il programma. Alternativamente, è possibile inserire la variabile all'interno di una classe, ma questo comporterebbe una modifica sostanziale a tutto il codice. 

In termini grafici, questo metodo può essere spiegato con la figura sottostante:

![Encapsulate Variable](/1.%20Simple%20Refactoring%20Methods/Encapsulate%20Variable/Encapsulate%20Variable.svg)

in cui, degli stessi riferimenti all'interno del codice, vengono sostituiti con un unico metodo di accesso alle nostre variabili globali, semplificando il codice, ed evitando ripetizioni in questo.

## Problema
Per vedere in atto questo metodo di rifattorizzazione, consideriamo il seguente esecizo per la gestione di alcune camere di albergo. 
* Si vuole implementare un programma che permetta di gestire una serie di camere per un albergo, in particolare, si vuole poter assegnare una camera ad un cliente, se questa è disponibile, registrare una nuova camera, e calcolare le statistiche d'uso dell'intera struttura, come ad esempio: percentuale di camere occupate, e prossimo checkout che deve essere eseguito. 

Dividendo il codice in funzioni da implementare, è stata prodotta la seguente funzione, per gestire l'assegnamento di una stanza ad un cliente:

```javascript
function assignRoomToClient (roomId, clientFirstName, clientLastName, checkout) {
    if(hotel.rooms.length >= roomId) {
        const roomGuest = hotel.rooms[roomId].guest;
        if(roomGuest === null) {
            hotel.rooms[roomId].guest = {
                firstName : clientFirstName,
                lastName : clientLastName,
                checkout : checkout
            };
            return hotel.rooms[roomId].guest;
        }
        throw new Error('Room is already occupied by guest ' + roomGuest.firstName + ' ' + roomGuest.lastName + '.');
    }
    throw new Error('Not a valid Room ID.');
}
```
nel caso in cui la stanza non sia presente, o risulta essere già occupata, allora viene sollevata un'eccezione che ne indica la natura del problema. Ma il vero problema risiede nell'assegnamento delle informazioni della stanza al cliente, in questo non viene incapsulato l'accesso ai dati dell'hotel.

Potremmo dire la stessa cosa, per le rimanenti funzioni, in cui si accede indiscriminatamente ai campi della variabile globale, duplicando successivamente il codice che regola l'accesso a questi. 

```javascript
function addNewRoom (roomName, costPerDay) {
    const numberOfRooms = hotel.rooms.length;
    if(numberOfRooms < hotel.capacity) {
        hotel.rooms.push({
            name : roomName,
            costPerDay : costPerDay,
            guest : null
        });
    } else {
        throw new Error('Reached max capacity.');
    }
}
function percentageOfOccupiedRoom () {
    const numberOfRooms = hotel.rooms.length;
    let occupedRooms = 0;
    hotel.rooms.forEach((room) => {
        if (room.guest !== null) {
            occupedRooms++;
        }
    });
    if( occupedRooms > 0 ) {
        return (occupedRooms / numberOfRooms) * 100;
    }
    return 0;
}

function nextChecout () {
    let nextGuest = hotel.rooms[0].guest;
    if(nextGuest === null) {
        hotel.rooms.forEach((room) => {
            if(room.guest !== null) {
                nextGuest = room.guest;
            }
        });
        if(nextGuest === null) {
            throw new Error ('No Guest in the hotel.');
        }
    }         
    hotel.rooms.forEach((room) => {
        if(room.guest !== null && Date.parse(room.guest.checkout) < Date.parse(nextGuest.checkout)) {
            nextGuest = room.guest;
        }
    });
    return nextGuest.checkout;
}
```

## Soluzione
Nella soluzione che si propone, per prima cosa definiamo un modulo separato in cui inseriamo la variabile globale, rendendola di conseguenza privata, ma permettendo l'accesso pubblico ai metodi che la manipolano:
```javascript
class Hotel {

    constructor() {
        this._hotel = {
            name : 'Super Hotel',
            capacity: 50,
            rooms : [
                {
                    name : 'Room 1',
                    costPerDay : 50.00,
                    guest : {
                        firstName : 'Guest 1 first name',
                        lastName : 'Guest 1 last name',
                        checkout : '09/15/2023'
                    }
                },
                {
                    name : 'Room 2',
                    costPerDay : 40.00,
                    guest : {
                        firstName : 'Guest 2 first name',
                        lastName : 'Guest 2 last name',
                        checkout : '12/12/2023'
                    }
                },
                {
                    name : 'Room 3',
                    costPerDay : 150.00,
                    guest : null
                },
                {
                    name : 'Room 4',
                    costPerDay : 87.00,
                    guest : {
                        firstName : 'Guest 4 first name',
                        lastName : 'Guest 4 last name',
                        checkout : '10/16/2023'
                    }
                },
                {
                    name : 'Room 5',
                    costPerDay : 42.00,
                    guest : null
                }
            ]
        };
    }

    get name () {
        return this._hotel.name;
    }

    get capacity () {
        return this._hotel.capacity;
    }

    get numberOfRooms () {
        return this._hotel.rooms.length;
    }

    get rooms () {
        return this._hotel.rooms;
    }

    getRoomGuest (id) {
        if(this._hotel.rooms[id].guest !== null) {
            return new Client (this._hotel.rooms[id].guest.firstName, this._hotel.rooms[id].guest.lastName, this._hotel.rooms[id].guest.checkout);
        }
        return null;
    }

    setRoomGuest (id, guest) {
        this._hotel.rooms[id].guest = { 
            firstName : guest.firstName,
            lastName : guest.lastName,
            checkout : guest.checkout
        };
        return new Client (this._hotel.rooms[id].guest.firstName, this._hotel.rooms[id].guest.lastName, this._hotel.rooms[id].guest.checkout);
    }

    addRoom (roomName, costPerDay) {
        this._hotel.rooms.push({
            name : roomName,
            costPerDay : costPerDay,
            guest : null
        });
    }

    get occupiedRooms () {
        let occupedRooms = 0;
        hotel.rooms.forEach((room) => {
            if (room.guest !== null) {
                occupedRooms++;
            }
        });
        return occupedRooms;
    }
}
```

eseguiamo quindi la stessa operazione, per facilitarci l'accesso alle informazioni relative ad un ospite di una stanza:
```javascript

class Client {

    constructor(firstName, lastName, checkout) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._checkout = checkout;
    }

    get firstName () {
        return this._firstName;
    }

    get lastName () {
        return this._lastName;
    }

    get checkout () {
        return this._checkout;
    }

    set firstName(firstName) {
        if((firstName !== null) && (firstName !== '')) {
            this._firstName = firstName;
        } else {
            throw new Error ('Not a valid first name.');
        }
    }

    set lastName(lastName) {
        if((lastName !== null) && (lastName !== '')) {
            this._lastName = lastName;
        } else {
            throw new Error ('Not a valid last name.');
        }
    }

    set checkout (checkout) {
        if((checkout !== null) && (Date.parse(checkout) !== NaN)) {
            this._checkout = checkout;
        } else {
            throw new Error ('Not a valid checkout date.');
        }
    }

    _isAValidField (field) {
        if (typeof field === 'string') {
            return( field !== null) && (field !== '');
        }
        return (field !== null) && (Date.parse(field) !== NaN);
    }
}
```

infine, modifichiamo le funzioni del file, tenendo conto dei nuovi metodi di accesso ai dati:

```javascript
function assignRoomToClient (roomId, clientFirstName, clientLastName, checkout) {
    if( hotel.numberOfRooms >= roomId) {
        const roomGuest = hotel.getRoomGuest(roomId);
        if(roomGuest === null) {
            return hotel.setRoomGuest(roomId, new Client(clientFirstName, clientLastName, checkout));
        }
        throw new Error('Room is already occupied by guest ' + roomGuest.firstName + ' ' + roomGuest.lastName + '.');
    }
    throw new Error('Not a valid Room ID.');
}

function addNewRoom (roomName, costPerDay) {
    const numberOfRooms = hotel.numberOfRooms;
    if(numberOfRooms < hotel.capacity) {
        hotel.addRoom(roomName, costPerDay);
    } else {
        throw new Error('Reached max capacity.');
    }
}

function percentageOfOccupiedRoom () {
    const numberOfRooms = hotel.numberOfRooms;
    let occupedRooms = hotel.occupiedRooms;
    if( occupedRooms > 0 ) {
        return (occupedRooms / numberOfRooms) * 100;
    }
    return 0;
}

function nextChecout () {
    let nextGuest = hotel.getRoomGuest(0);
    if(nextGuest === null) {
        hotel.rooms.forEach((room) => {
            if(room.guest !== null) {
                nextGuest = room.guest;
            }
        });
        if(nextGuest === null) {
            throw new Error ('No Guest in the hotel.');
        }
    }         
    hotel.rooms.forEach((room, index) => {
        const guest = hotel.getRoomGuest(index);
        if(guest !== null && Date.parse(guest.checkout) < Date.parse(nextGuest.checkout)) {
            nextGuest = guest;
        }
    });
    return nextGuest.checkout;
}
```
usando i metodi _getter_ e _setter_ di Javascript, ci è permetto non modificare di molto la sintassi usata precedentemente, in quanto con questi metodi è possibili accedere direttamente agli attributi di una classe, ma passando attraverso i primi, quindi senza l'invocazione diretta della funzione che li manipola.
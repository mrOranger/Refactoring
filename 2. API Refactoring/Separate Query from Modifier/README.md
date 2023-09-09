# Separe Query from Modifier
Le API della nostra applicazione rappresentano il contratto che viene stipulato tra il nostro manufatto, e chi intende utilizzarlo, è bene quindi che sia il più chiaro possibile, affinché entrambi possiamo trarne vantaggio.

Quando si realizzano delle API, spesso involontariamente si finische per mischiare tra di loro logiche diverse, e frequentemente queste logiche che vengono unite tra loro corrispondono ad operazioni con side effects, ed operazioni che non possiedono effetti collaterali.

E'buona prassi, quindi, separare tra loro le logiche di utilizzo, ed inoltre, indicare nel nome della funzione se questa possiede o no operazione con effetti collaterali.

## Problema

Prendiamo ad esempio il codice inserito all'interno del modulo [user.controller.js](./http/controllers/user.controller.js), nella sua prima versione:

```javascript
export class UserController {

    static getUsersAndStatistics = function (request, response) {
        let currentUsers = users;
        let totalNumberOfUsers = currentUsers.length;
        let oldestUser, youngestUser;
        currentUsers.sort((firstUser, secondUser) => firstUser.age - secondUser.age);
        oldestUser = currentUsers[totalNumberOfUsers - 1];
        youngestUser = currentUsers[0];
        return response.json({
            "users" : currentUsers,
            "totalNumberOfUsers" : totalNumberOfUsers,
            "youngestUser" : youngestUser,
            "oldestUser" : oldestUser
        });
    }

}
```
a rigor di logica, per quanto indicato dal nome della funzione, questa dovrebbe restituire gli utenti e delle statistiche associate. Tuttavia, si vede che questa esegue in un unico blocco queste operazioni, separiamo quindi le operazioni, inserendole all'interno di blocchi di codice distinti.

## Soluzione
```javascript
export class UserController {
    static getUsersAndStatistics = function (request, response) {
        const users = UserController.#getUsers();
        const statistics = UserController.#computeStatistics(users);
        return response.json(statistics);
    }

    static #getUsers () {
        return users;
    }

    static #computeStatistics (users) {
        let totalNumberOfUsers = users.length;
        let oldestUser, youngestUser;

        users.sort((firstUser, secondUser) => firstUser.age - secondUser.age);
        oldestUser = users[totalNumberOfUsers - 1];
        youngestUser = users[0];

        return {
            "users" : users,
            "totalNumberOfUsers" : totalNumberOfUsers,
            "youngestUser" : youngestUser,
            "oldestUser" : oldestUser
        };
    }
}
```
direi che adesso la logica del nostro Controller è più chiara e lineare. Vorrei però far notare due cose: 
* La prima riguarda la separazione del codice in funzioni, e l'assegnazione di un modificatore di visibilità a queste, perché non ritengo siano utilizzabili in altre parti di codice.
* La seconda cosa, un po' meno evidente, è che in funzioni dal corpo complesso, preferisco creare una netta separazione tra: _dichiarazioni di variabili_, _azione_ eseguita dalla funzione ed infine _risultato_ che deve essere restituito.

Quest'utltima regola non è una massima da dover seguire necessariamente, ma ritengo che aiuti molto a comprendere il codice, e si ispira alla regola __AAA__ (Arrange, Act & Assert), che viene utilizzata nel __TDD__ (Test Driven Development). 
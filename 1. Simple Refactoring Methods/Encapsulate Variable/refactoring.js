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

const hotel = new Hotel();

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

try {
    console.log(percentageOfOccupiedRoom());
    console.log(nextChecout());
    console.log(assignRoomToClient(2, 'Client 3 first name', 'Client 3 last name', '09/12/2023'));
    console.log(percentageOfOccupiedRoom());
    console.log(nextChecout());
    addNewRoom('Room 30', 23.00);
    console.log(percentageOfOccupiedRoom());
    console.log(assignRoomToClient(5, 'Client 3 first name', 'Client 3 last name', '09/12/2023'));
    console.log(percentageOfOccupiedRoom());
} catch (error) {
    console.error (error.message);
}
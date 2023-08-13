const hotel = {
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
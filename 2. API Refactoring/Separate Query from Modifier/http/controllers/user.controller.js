import { users } from '../../database/index.js';

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
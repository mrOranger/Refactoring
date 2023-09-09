export class UserController {

    static getUsers = function (request, response) {
        return response.json('User!');
    }

}
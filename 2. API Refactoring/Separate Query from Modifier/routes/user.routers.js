import express from 'express';
import { UserController } from '../http/controllers/user.controller.js';

const router = express.Router();

const getUsersRoute =  router.get('/users', UserController.getUsers);

export {
    getUsersRoute
};
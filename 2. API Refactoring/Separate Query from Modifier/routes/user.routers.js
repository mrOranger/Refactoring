import express from 'express';
import { UserController } from '../http/index.js';

const router = express.Router();

const getUsersRoute =  router.get('/users', UserController.getUsers);

export {
    getUsersRoute
};
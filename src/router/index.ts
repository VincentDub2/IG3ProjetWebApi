import express from 'express';
import authentification from './authentification';
import users from './users';
import foods from './foods';
import brands from './brands';
import meals from './meals';

const router = express.Router();

export default (): express.Router => {
    authentification(router);
    users(router);
    foods(router);
    brands(router);
    meals(router);
    return router;
  };
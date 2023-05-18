import express from 'express' ;

import { deleteUser, getActualUser,getALLUsers} from '../controllers/users';
import { isAuthentificated, isOwner } from '../middlewares';



export default (router : express.Router) => {
    router.get('/users',getALLUsers);
    router.get('/user/actual',isAuthentificated, getActualUser);
    router.delete('/users/:id',isAuthentificated,isOwner, deleteUser);
};


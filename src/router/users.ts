import express from 'express' ;

import { deleteUser, getActualUser,getALLUsers,updateUser} from '../controllers/users';
import { isAuthentificated, isOwner } from '../middlewares';
import { updateAllUserById } from 'services/user.service';
import { getUserFoods } from '../controllers/foods';



export default (router : express.Router) => {
    router.get('/users',getALLUsers);
    router.get('/user/actual',isAuthentificated, getActualUser);
    router.delete('/userDel/:id',isAuthentificated,isOwner, deleteUser);
    router.post('/user/:id',isAuthentificated,updateUser);
    router.get('/user/:id/foods',isAuthentificated,isOwner,getUserFoods);

};


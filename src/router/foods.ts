import express from 'express' ;

import { addFood, searchFoods } from '../controllers/foods';
import { isAuthentificated, isOwner } from '../middlewares';



export default (router : express.Router) => {
    router.get("/food/search", searchFoods);
    router.post("/food/add",isAuthentificated,addFood);
};


import express from 'express' ;

import {
    
    getFoodsEatenOnDay,
    addFoodToMeal
 } from '../controllers/meals';
import { isAuthentificated, isOwner } from '../middlewares';



export default (router : express.Router) => {
    router.post("/meal/add",isAuthentificated,addFoodToMeal);
    router.get("/meals/:userId/:date",isAuthentificated,getFoodsEatenOnDay);
};


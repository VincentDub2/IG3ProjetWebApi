import express from 'express' ;

import { addFood, searchFoods,updateFood,deleteFood } from '../controllers/foods';
import { isAuthenticated,isOwnerOfFood  } from '../middlewares';



export default (router : express.Router) => {
    router.get("/food/search", searchFoods);
    router.post("/food/add",isAuthenticated,addFood);
    router.put("/food/:id",isAuthenticated,isOwnerOfFood,updateFood);
    router.delete("/food/:id",isAuthenticated,isOwnerOfFood,deleteFood);
};


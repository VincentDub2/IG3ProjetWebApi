import express from 'express' ;

import { addFood, searchFoods,updateFood,deleteFood } from '../controllers/foods';
import { isAuthentificated,isOwnerOfFood  } from '../middlewares';



export default (router : express.Router) => {
    router.get("/food/search", searchFoods);
    router.post("/food/add",isAuthentificated,addFood);
    router.put("/food/:id",isAuthentificated,isOwnerOfFood,updateFood);
    router.delete("/food/:id",isAuthentificated,isOwnerOfFood,deleteFood);
};


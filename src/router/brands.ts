import express from 'express' ;

import { addBrand,allBrand } from '../controllers/brands';
import { isAuthenticated, isOwner } from '../middlewares';



export default (router : express.Router) => {
    router.get("/brands", allBrand);
    router.post("/brands/add",isAuthenticated,addBrand);
};


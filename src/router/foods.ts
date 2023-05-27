import express from 'express';
import { addBrand, allBrand } from '../controllers/brands';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    // Route pour récupérer toutes les marques
    router.get('/brands', allBrand);

    // Route pour ajouter une marque (nécessite une authentification)
    router.post('/brands/add', isAuthenticated, addBrand);
};

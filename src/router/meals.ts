import express from 'express';
import {
    getFoodsEatenOnDay,
    addFoodToMeal
} from '../controllers/meals';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    // Route pour ajouter un aliment à un repas (nécessite une authentification)
    router.post('/meal/add', isAuthenticated, addFoodToMeal);

    // Route pour récupérer les aliments consommés lors d'une journée spécifique (nécessite une authentification)
    router.get('/meals/:userId/:date', isAuthenticated, getFoodsEatenOnDay);
};

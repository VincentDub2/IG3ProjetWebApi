import express from 'express';
import {
    deleteUser,
    getActualUser,
    getAllUsers,
    updateUser,
    getUserFoods
} from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    // Route pour récupérer tous les utilisateurs
    router.get('/users', getAllUsers);

    // Route pour récupérer l'utilisateur actuel (nécessite une authentification)
    router.get('/user/actual', isAuthenticated, getActualUser);

    // Route pour supprimer un utilisateur (nécessite une authentification et d'être le propriétaire de l'utilisateur)
    router.delete('/userDel/:id', isAuthenticated, isOwner, deleteUser);

    // Route pour mettre à jour un utilisateur (nécessite une authentification)
    router.post('/user/:id', isAuthenticated, updateUser);

    // Route pour récupérer les aliments d'un utilisateur spécifique (nécessite une authentification et d'être le propriétaire de l'utilisateur)
    router.get('/user/:id/foods', isAuthenticated, isOwner, getUserFoods);
};

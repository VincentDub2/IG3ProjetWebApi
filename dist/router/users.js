"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
const foods_1 = require("../controllers/foods");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    // Route pour récupérer tous les utilisateurs
    router.get('/users', users_1.getAllUsers);
    // Route pour récupérer l'utilisateur actuel (nécessite une authentification)
    router.get('/user/actual', middlewares_1.isAuthenticated, users_1.getActualUser);
    // Route pour supprimer un utilisateur (nécessite une authentification et d'être le propriétaire de l'utilisateur)
    router.delete('/userDel/:id', middlewares_1.isAuthenticated, middlewares_1.isOwner, users_1.deleteUser);
    // Route pour mettre à jour un utilisateur (nécessite une authentification)
    router.post('/user/:id', middlewares_1.isAuthenticated, users_1.updateUser);
    // Route pour récupérer les aliments d'un utilisateur spécifique (nécessite une authentification et d'être le propriétaire de l'utilisateur)
    router.get('/user/:id/foods', middlewares_1.isAuthenticated, middlewares_1.isOwner, foods_1.getUserFoods);
};
//# sourceMappingURL=users.js.map
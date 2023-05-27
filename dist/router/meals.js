"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meals_1 = require("../controllers/meals");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    // Route pour ajouter un aliment à un repas (nécessite une authentification)
    router.post('/meal/add', middlewares_1.isAuthenticated, meals_1.addFoodToMeal);
    // Route pour récupérer les aliments consommés lors d'une journée spécifique (nécessite une authentification)
    router.get('/meals/:userId/:date', middlewares_1.isAuthenticated, meals_1.getFoodsEatenOnDay);
};
//# sourceMappingURL=meals.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const brands_1 = require("../controllers/brands");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    // Route pour récupérer toutes les marques
    router.get('/brands', brands_1.allBrand);
    // Route pour ajouter une marque (nécessite une authentification)
    router.post('/brands/add', middlewares_1.isAuthenticated, brands_1.addBrand);
};
//# sourceMappingURL=foods.js.map
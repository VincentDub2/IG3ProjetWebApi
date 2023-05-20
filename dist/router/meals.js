"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meals_1 = require("../controllers/meals");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.post("/meal/add", middlewares_1.isAuthentificated, meals_1.addFoodToMeal);
    router.get("/meals/:userId/:date", middlewares_1.isAuthentificated, meals_1.getFoodsEatenOnDay);
};
//# sourceMappingURL=meals.js.map
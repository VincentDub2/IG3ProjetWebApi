"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foods_1 = require("../controllers/foods");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get("/food/search", foods_1.searchFoods);
    router.post("/food/add", middlewares_1.isAuthentificated, foods_1.addFood);
    router.put("/food/:id", middlewares_1.isAuthentificated, middlewares_1.isOwnerOfFood, foods_1.updateFood);
    router.delete("/food/:id", middlewares_1.isAuthentificated, middlewares_1.isOwnerOfFood, foods_1.deleteFood);
};
//# sourceMappingURL=foods.js.map
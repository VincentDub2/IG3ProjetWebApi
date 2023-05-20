"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const brands_1 = require("../controllers/brands");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get("/brands", brands_1.allBrand);
    router.post("/brands/add", middlewares_1.isAuthentificated, brands_1.addBrand);
};
//# sourceMappingURL=brands.js.map
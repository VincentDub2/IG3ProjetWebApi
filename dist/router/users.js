"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
const middlewares_1 = require("../middlewares");
const foods_1 = require("../controllers/foods");
exports.default = (router) => {
    router.get('/users', users_1.getALLUsers);
    router.get('/user/actual', middlewares_1.isAuthentificated, users_1.getActualUser);
    router.delete('/userDel/:id', middlewares_1.isAuthentificated, middlewares_1.isOwner, users_1.deleteUser);
    router.post('/user/:id', middlewares_1.isAuthentificated, users_1.updateUser);
    router.get('/user/:id/foods', middlewares_1.isAuthentificated, middlewares_1.isOwner, foods_1.getUserFoods);
};
//# sourceMappingURL=users.js.map
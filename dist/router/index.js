"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentification_1 = __importDefault(require("./authentification"));
const users_1 = __importDefault(require("./users"));
const foods_1 = __importDefault(require("./foods"));
const brands_1 = __importDefault(require("./brands"));
const meals_1 = __importDefault(require("./meals"));
const router = express_1.default.Router();
exports.default = () => {
    (0, authentification_1.default)(router);
    (0, users_1.default)(router);
    (0, foods_1.default)(router);
    (0, brands_1.default)(router);
    (0, meals_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map
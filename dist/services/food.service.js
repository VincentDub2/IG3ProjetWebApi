"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoodByUserId = exports.getFoodById = exports.getFoodByBarcode = exports.getFoodByCategory = exports.getFoodByName = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getFoodByName = (name) => prisma_1.default.food.findMany({ where: { name } });
exports.getFoodByName = getFoodByName;
const getFoodByCategory = (foodCategory) => prisma_1.default.food.findMany({ where: { foodCategory } });
exports.getFoodByCategory = getFoodByCategory;
//export const getFoodByBrand = (brand : string) => prisma.food.findMany({ where: { brand }});
const getFoodByBarcode = (barcode) => prisma_1.default.food.findMany({ where: { barcode } });
exports.getFoodByBarcode = getFoodByBarcode;
const getFoodById = (id) => prisma_1.default.food.findUnique({ where: { id } });
exports.getFoodById = getFoodById;
const getFoodByUserId = (userId) => prisma_1.default.food.findMany({ where: { userId } });
exports.getFoodByUserId = getFoodByUserId;
//# sourceMappingURL=food.service.js.map
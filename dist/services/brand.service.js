"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrands = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getBrands = async () => {
    const brands = await prisma_1.default.brand.findMany();
    const brandData = brands.map((brand) => ({ id: brand.id, name: brand.name }));
    return brandData;
};
exports.getBrands = getBrands;
//# sourceMappingURL=brand.service.js.map
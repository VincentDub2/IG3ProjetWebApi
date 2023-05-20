"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBrand = exports.allBrand = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const brand_service_1 = require("../services/brand.service");
// Récupérer toutes les marques
const allBrand = async (req, res) => {
    try {
        const brands = await (0, brand_service_1.getBrands)();
        res.json(brands);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};
exports.allBrand = allBrand;
// Ajouter une nouvelle marque
const addBrand = async (req, res) => {
    try {
        const { name } = req.body;
        // Créer le nouvel objet marque
        const newBrand = await prisma_1.default.brand.create({
            data: {
                name,
            },
        });
        res.json(newBrand);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};
exports.addBrand = addBrand;
//# sourceMappingURL=brands.js.map
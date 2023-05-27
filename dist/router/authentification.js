"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentifications_1 = require("../controllers/authentifications");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100 // limite chaque IP à 100 requêtes par fenêtre
});
exports.default = (router) => {
    // Route pour l'inscription des utilisateurs
    router.post('/auth/register', authentifications_1.register);
    // Route pour la connexion des utilisateurs avec un taux de limite
    router.post('/auth/login', limiter, authentifications_1.login);
    // Route pour la connexion externe des utilisateurs (ex: via les médias sociaux)
    router.post('/auth/socialLog', authentifications_1.ExternalLogin);
};
//# sourceMappingURL=authentification.js.map
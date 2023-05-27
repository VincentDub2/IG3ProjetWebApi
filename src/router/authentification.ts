import express from 'express';
import { login, register, ExternalLogin } from '../controllers/authentifications';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limite chaque IP à 100 requêtes par fenêtre
});

export default (router: express.Router) => {
    // Route pour l'inscription des utilisateurs
    router.post('/auth/register', register);

    // Route pour la connexion des utilisateurs avec un taux de limite
    router.post('/auth/login', limiter, login);

    // Route pour la connexion externe des utilisateurs (ex: via les médias sociaux)
    router.post('/auth/socialLog', ExternalLogin);
};

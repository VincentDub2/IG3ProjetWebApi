"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalLogin = exports.login = exports.register = void 0;
const user_service_1 = require("../services/user.service");
const helpers_1 = require("../helpers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma"));
// Durée de validité des tokens (1 heure)
const jwtExpiration = "1h";
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        //verifier que les champs sont remplis
        if (!email || !password || !username) {
            console.log(email, password, username);
            console.log("Missing email");
            return res.status(400).send("Missing email");
        }
        //verifier que l'utilisateur n'existe pas déjà
        const existingUser = await (0, user_service_1.getUserByEmail)(email);
        if (existingUser) {
            console.log("existingUser");
            return res.sendStatus(400);
        }
        // On génère un salt aléatoire
        const salt = (0, helpers_1.random)();
        //Creation de l'utilisateur
        const user = await (0, user_service_1.createUser)({
            email,
            name: username,
            salt,
            hashedPassword: (0, helpers_1.authentification)(salt, password),
        });
        // Créer un token pour l'utilisateur
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: jwtExpiration });
        // Ajouter le token à la réponse
        res.cookie("Eattrack-Auth", token, { domain: "localhost", path: "/" });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.register = register;
//
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log("Missing email or password");
            return res.sendStatus(400);
        }
        var user = await (0, user_service_1.getUserByEmail)(email);
        if (!user) {
            console.log("NO existing User");
            return res.sendStatus(400);
        }
        // Vérifier le mot de passe
        const expectedHash = (0, helpers_1.authentification)(user.salt, password);
        if (expectedHash !== user.hashedPassword) {
            return res.sendStatus(403);
        }
        // Créer un token pour l'utilisateur
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: jwtExpiration });
        console.log("voici le token crée: ", token);
        user.sessionToken = token;
        // Enregistrer le token dans la base de données
        await (0, user_service_1.updateUserById)(user.id, { sessionToken: token });
        // Ajouter le token à la réponse
        res.cookie("Eattrack-Auth", token, {
            domain: "localhost",
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: 'strict' // assure que le cookie n'est envoyé que si la demande provient du même site
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.login = login;
const ExternalLogin = async (req, res) => {
    const { id, name, email, image, accessToken, refreshToken, provider } = req.body;
    try {
        console.log(req.body);
        // Recherchez si le compte pour le fournisseur spécifique existe déjà
        let account = await prisma_1.default.account.findFirst({
            where: {
                provider: provider,
                providerAccountId: id
            },
            include: {
                user: true
            }
        });
        console.log(account);
        // Si le compte existe déjà, mettez à jour les informations du compte comment le token 
        if (account) {
            account = await prisma_1.default.account.update({
                where: {
                    id: account.id
                },
                data: {
                    access_token: accessToken,
                    refresh_token: refreshToken
                },
                include: {
                    user: true
                }
            });
        }
        console.log(account);
        // Si le compte existe, renvoyer l'utilisateur et le compte
        if (account) {
            res.status(200).json({ user: account.user, account });
            return;
        }
        // Créez un nouvel utilisateur
        const newUser = await prisma_1.default.user.create({
            data: {
                name,
                email,
                image,
                accounts: {
                    create: {
                        provider: provider,
                        providerAccountId: id,
                        type: 'oauth',
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        // Remplissez les autres champs nécessaires ici
                    },
                },
            },
            include: {
                accounts: true
            }
        });
        console.log(newUser);
        res.status(200).json({ newUser, account });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de la création de l\'utilisateur et du compte' });
    }
};
exports.ExternalLogin = ExternalLogin;
//# sourceMappingURL=authentifications.js.map
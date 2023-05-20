"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getALLUsers = exports.deleteUser = exports.updateUser = exports.getActualUser = void 0;
const user_service_1 = require("../services/user.service");
const user_service_2 = require("../services/user.service");
const helpers_1 = require("../helpers");
//Cette route nous permet de récupérer l'utilisateur actuel
const getActualUser = async (req, res) => {
    try {
        // On récupère le token de la requête
        let sessionToken = req.cookies['Eattrack-Auth'];
        if (!sessionToken) {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.replace('Eattrack-Auth-', '').trim();
                if (token) {
                    sessionToken = token;
                }
            }
        }
        // Si le token n'existe pas, on renvoie une erreur
        if (!sessionToken) {
            return res.sendStatus(403);
        }
        //On récupère l'utilisateur lié a ce token
        const user = await (0, user_service_1.getUserBySessionToken)(sessionToken);
        if (!user) {
            return res.sendStatus(404); // Not Found
        }
        console.log("User retourner", user);
        // On filtre les données sensibles (mot de passe, token,salt)
        const filteredUser = (0, helpers_1.filterSensitiveData)(user);
        return res.status(200).json(filteredUser).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400); // Bad Request
    }
};
exports.getActualUser = getActualUser;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, name, weight, size, age, gender, goalType, activityLevel, targetWeight, dailyCalories, dailyProtein, dailyFat, dailyCarbs, percentageProtein, percentageFat, percentageCarbs } = req.body;
        console.log("voici le body", req.body);
        const user = await (0, user_service_2.updateAllUserById)(id, {
            email,
            name,
            weight,
            size,
            age,
            gender,
            goalType,
            activityLevel,
            targetWeight,
            dailyCalories,
            dailyProtein,
            dailyFat,
            dailyCarbs,
            percentageProtein,
            percentageFat,
            percentageCarbs
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await (0, user_service_2.deleteUserById)(id);
        return res.status(200).json(deleteUser).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.deleteUser = deleteUser;
const getALLUsers = async (req, res) => {
    try {
        const users = await (0, user_service_2.getUsers)();
        return res.status(200).json(users).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.getALLUsers = getALLUsers;
//# sourceMappingURL=users.js.map
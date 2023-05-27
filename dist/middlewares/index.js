"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOwnerOfFood = exports.isOwner = exports.isAuthenticated = void 0;
const lodash_1 = require("lodash");
const prisma_1 = __importDefault(require("../prisma"));
const user_service_1 = require("../services/user.service");
const isAuthenticated = async (req, res, next) => {
    try {
        var sessionToken = req.cookies['Eattrack-Auth'];
        // Check for Authorization header if no cookie was found
        if (!sessionToken) {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.replace('Eattrack-Auth-', '').trim();
                if (token) {
                    sessionToken = token;
                    console.log("token: ", sessionToken);
                }
            }
        }
        if (!sessionToken) {
            console.log("No token found");
            //console.log("verifcation: ",req);
            return res.sendStatus(403);
        }
        console.log("token : ", sessionToken);
        var existingUser = await (0, user_service_1.getUserBySessionToken)(sessionToken);
        if (!existingUser) {
            console.log("utilsateur non trouvé");
            return res.sendStatus(402);
        }
        (0, lodash_1.merge)(req, { identity: existingUser });
        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.isAuthenticated = isAuthenticated;
const isOwner = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id.toString());
        const currentUserId = (0, lodash_1.get)(req, 'identity.id');
        console.log("verifcation: ", (0, lodash_1.get)(req, 'identity.id'));
        if (!currentUserId) {
            console.log("utilsateur non trouvé");
            return res.sendStatus(403);
        }
        if (id !== currentUserId) {
            return res.sendStatus(403);
        }
        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.isOwner = isOwner;
const isOwnerOfFood = async (req, res, next) => {
    try {
        const { id } = req.params; // This should be the foodId in your route
        const currentUserId = (0, lodash_1.get)(req, 'identity.id');
        // If no currentUserId found, send an unauthorized response
        if (!currentUserId) {
            console.log("No user found");
            return res.sendStatus(403);
        }
        // Fetch the food from database
        const food = await prisma_1.default.food.findUnique({
            where: {
                id: id
            }
        });
        // If no food found, send a not found response
        if (!food) {
            return res.sendStatus(404);
        }
        // If the userId of the food does not match the currentUserId, send an unauthorized response
        if (food.userId !== currentUserId) {
            return res.sendStatus(403);
        }
        // If everything checks out, call the next middleware
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};
exports.isOwnerOfFood = isOwnerOfFood;
//# sourceMappingURL=index.js.map
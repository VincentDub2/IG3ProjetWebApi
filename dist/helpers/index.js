"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterSensitiveData = exports.authentification = exports.random = void 0;
const crypto_1 = __importDefault(require("crypto"));
//Permet de créer un salt aléatoire
const random = () => crypto_1.default.randomBytes(128).toString('base64');
exports.random = random;
//Permet de créer une clé de hachage a partir du salt et du mot de passe
const authentification = (salt, password) => {
    console.log("Une clef d'authentification a été créée");
    return crypto_1.default.createHmac('sha256', [salt, password].join('/')).update(process.env.SECRET).digest('hex');
};
exports.authentification = authentification;
function filterSensitiveData(user) {
    const { hashedPassword, salt, sessionToken, ...filteredUser } = user;
    return filteredUser;
}
exports.filterSensitiveData = filterSensitiveData;
//# sourceMappingURL=index.js.map
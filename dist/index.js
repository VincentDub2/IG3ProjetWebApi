"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'https://api.eattrack.net',
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
const privateKey = fs_1.default.readFileSync('/etc/letsencrypt/live/api.eattrack.net/privkey.pem', 'utf8');
const certificate = fs_1.default.readFileSync('/etc/letsencrypt/live/api.eattrack.net/cert.pem', 'utf8');
const ca = fs_1.default.readFileSync('/etc/letsencrypt/live/api.eattrack.net/chain.pem', 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};
const server = https_1.default.createServer(credentials, app);
server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
app.use('/', (0, router_1.default)());
//# sourceMappingURL=index.js.map
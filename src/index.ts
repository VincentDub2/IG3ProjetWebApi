import express from 'express';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';
import dotenv from 'dotenv';



dotenv.config();


const app = express();

app.use(
    cors({
        origin: 'https://api.eattrack.net', // Remplacez par votre domaine
        credentials: true,
    }));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.eattrack.net/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/api.eattrack.net/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/api.eattrack.net/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const server = https.createServer(credentials, app);

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});

app.use('/',router());
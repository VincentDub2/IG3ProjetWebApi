import express from 'express';
import https from 'https';
//import http from 'http';
import fs from 'fs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';
import dotenv from 'dotenv';


/**
 * Module principal du serveur Express pour l'API.
 */


dotenv.config();


const app = express();

/**
 * Middleware CORS pour autoriser les requêtes cross-origin.
 * Les requêtes provenant de 'https://eattrack.vercel.app' et 'http://localhost:3000' sont autorisées.
 * L'option 'credentials' est activée pour prendre en charge les cookies.
 */


app.use(
    cors({
       origin: ['https://eattrack.vercel.app','http://localhost:3000'] ,
        credentials: true,
    }));

app.use(compression());
app.use(cookieParser());

/**
 * Middleware pour analyser le corps des requêtes au format JSON.
 */

app.use(bodyParser.json());


/**
 * Lecture des fichiers de clé privée, de certificat et de chaîne CA nécessaires pour la connexion HTTPS.
 */
const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.eattrack.net/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/api.eattrack.net/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/api.eattrack.net/chain.pem', 'utf8');

/**
 * Options de certificat et de clé privée pour la connexion HTTPS.
 */
const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

/**
 * Création du serveur HTTPS en utilisant les options de certificat et de clé privée.
 */
const server = https.createServer(credentials, app);



/**
 * Démarre le serveur Express en écoutant les requêtes sur le port 8080.
 */


server.listen(8080, () => {
    console.log('Server is running on port 8080');
});

app.use('/',router());
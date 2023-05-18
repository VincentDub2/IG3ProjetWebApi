import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';
// index.js ou app.js
import dotenv from 'dotenv';



dotenv.config();


const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000', 
        credentials: true,
    }));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});

app.use('/',router());
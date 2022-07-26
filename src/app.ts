
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import properties from '../services/properties.js';
import routes from '../routes/routes.js';
import setup_database from '../services/database.js';
import { verifyToken } from './utils.js';

const app = express();
const port = properties.port;
const bodyParserJson = bodyParser.json();
const bodyParserUrlEncoded = bodyParser.urlencoded({extended:true});
const whiteList = ['http://localhost:3000', 'http://localhost:3001'];

setup_database();

app.use(cookieParser());

app.use(cors({
  credentials:true,
  origin:whiteList
}));

app.use(bodyParserJson);

app.use(bodyParserUrlEncoded);

app.use('/dashboard', verifyToken, routes.dashboard);

app.use('/register', routes.register);

app.use('/login', routes.login);

app.use((_req, res, _next) => {
  res.status(404).end();
})

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
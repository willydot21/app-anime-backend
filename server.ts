
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.js";
import setupDatabase from "./services/database.js";
import { verifyToken } from "./services/utils.js";
import path from "path";
import dotenv from "dotenv";
import { getFollowingAnime } from "./models/user/user-services/following.js";

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

const app = express();
const port = process.env.PORT || 3000;
const bodyParserJson = bodyParser.json();
const bodyParserUrlEncoded = bodyParser.urlencoded({ extended: true });
const whiteList = ["http://localhost:3000", "http://localhost:3001", 'https://kinghub-anime.netlify.app'];

setupDatabase();

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: whiteList,
  })
);

app.use(bodyParserJson);

app.use(bodyParserUrlEncoded);

app.use("/auth/user/animeinfo", verifyToken, routes.authAnimeInfo);

app.use("/auth/user", verifyToken, routes.authUser);

app.use("/refresh-token", routes.refreshToken);

app.use("/register", routes.register);

app.use("/login", routes.login);

app.use("/logout", routes.logout);

app.use((_req, res, _next) => {
  res.status(404).end();
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});

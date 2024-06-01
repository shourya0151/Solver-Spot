//ye complete samghna hai

//env -> sceret keys
import { createRequire } from "module";

const require = createRequire(import.meta.url);

require("@babel/core").transform("code", {
  presets: ["@babel/preset-env"],
});

require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import  session from "express-session";
import db from "./database/index.js";
import router from "./routes/index.js";
import routeConfig from "./config/routeConfig.js";
import bodyParser from "body-parser";



const app = express();

routeConfig(passport);

app.use(cors());
app.use(helmet());

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "OJProject",
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


app.use('/OJ', router)


app.listen(4000, () => {
  db()
    .then(() => {
      console.log("Server is Running!!!");
    })
    .catch((error) => {
      console.log("Server connection failed");
      console.log(error);
    });
});

// http://localhost:4000/OJ/

//token , passport
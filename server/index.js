import "dotenv/config";
import express from "express";
import cors from "cors";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import middleware from "./helpers/middleware";

import models, { sequelize } from "./models/init-models";
import routes from "./routes/IndexRoute";
import authJWT from "./helpers/authJWT";
import { authenticate } from "passport";
const port = process.env.PORT || 1337;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compress());
app.use(cors());

app.use(async (req, res, next) => {
  req.context = { models };
  next();
});

app.post(
  process.env.URL_DOMAIN + "/login",
  authJWT.authenticate,
  authJWT.login
);

app.get(process.env.URL_DOMAIN + "/me", authJWT.ensureAdmin, (req, res) => {
  res.json("coo");
});

app.use(process.env.URL_API + "/bank", routes.bankRoute);
app.use(process.env.URL_API + "/bank_account", routes.bankAccountRoute);
app.use(process.env.URL_API + "/users", routes.userRoute);
app.use(process.env.URL_API + "/address", routes.addressRoute);
app.use(process.env.URL_API + "/hosted", routes.hostedRoute);
app.use(process.env.URL_API + "/orders", routes.orderRoute);
app.use(process.env.URL_API + "/houses_reserve_lines", routes.hritRoute);
app.use(process.env.URL_API + "/payment", routes.paymentRoute);

app.use(middleware.handleError);
app.use(middleware.notFound);

const dropDatabaseSync = false;

sequelize.sync({ force: dropDatabaseSync }).then(async () => {
  if (dropDatabaseSync) {
    console.log("Database do not drop");
  }
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});

export default app;

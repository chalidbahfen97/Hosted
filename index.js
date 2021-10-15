import "dotenv/config";
import express from "express";
import cors from "cors";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import middleware from "./helpers/middleware";

//access db
import models, { sequelize } from "./models/IndexModel";
import routes from "./routes/IndexRoute";
import authJWT from "./helpers/authJWT";
import { authenticate } from "passport";
//declare port
const port = process.env.PORT || 1337;

const app = express();
//parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//helmet agar bisa dikenali SEO
app.use(helmet());
//secure apps by setting various HTTP headers
app.use(compress());
//enable CORS -Cross Origin Resource Sharing
app.use(cors());

//loads models & save to req.context
app.use(async (req, res, next) => {
  req.context = { models };
  next();
});

// app.use("/hosted/", (req, res) => {
//   res.send("makes the best moment with hosted");
// });
//call route
// call routes
app.post(
  process.env.URL_DOMAIN + "/login",
  authJWT.authenticate,
  authJWT.login
);

app.get(process.env.URL_DOMAIN + "/me", authJWT.ensureAdmin, (req, res) => {
  res.json("coo");
});

app.use("/api/bank", routes.BankRoute);
app.use("/api/users", routes.UsersRoute);

//use middleware to handle error from others modules
app.use(middleware.handleError);
app.use(middleware.notFound);

//set false db
const dropDatabaseSync = false;

sequelize.sync({ force: dropDatabaseSync }).then(async () => {
  if (dropDatabaseSync) {
    console.log("Do not drop database");
  }
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});

export default app;

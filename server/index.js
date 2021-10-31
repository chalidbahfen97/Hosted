import "dotenv/config";
import express from "express";
import cors from "cors";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import middleware from "./helpers/middleware";

//access db
import models, { sequelize } from "./models/indexModels";
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

// call routes
// auth
app.use(process.env.URL_DOMAIN + "/auth", routes.AuthRoute);
// user
app.use(process.env.URL_API + "/users", routes.UserRoute);
// bank
app.use(process.env.URL_API + "/bank", routes.BankRoute);
// houses
app.use(process.env.URL_API + "/houses", routes.HouseRoute);
// reserve
app.use(process.env.URL_API + "/reserve", routes.ReserveRoute)


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

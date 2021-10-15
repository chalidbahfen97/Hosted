import "dotenv/config";
import express from "express";
import cors from "cors";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import models, { sequelize } from "./models/indexModels";

const port = process.env.PORT || 1337;

const app = express();

// parse body params and attach them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// user helmet untuk SEO
app.use(helmet());
// secure apps by setting various HTTP headers
app.use(compress());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// load models dan simpan di req.context
app.use(async (req, res, next) => {
  req.context = { models };
  next();
});

const dropDatabaseSync = false;
sequelize.sync({ force: dropDatabaseSync })
  .then(async () => {
    if (dropDatabaseSync) {
      console.log("Database do not drop");
    }
    app.listen(port, () => console.log(`Server Running on Port ${port}`));
  })
  .catch(error => console.log(error));

export default app;
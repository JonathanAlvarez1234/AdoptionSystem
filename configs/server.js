import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import limiter from "../src/middlewares/validar-cant-peticiones.js";
import authRoutes from '../src/auth/auth.routes.js'
import router from "../src/auth/auth.routes.js";

export const configureMiddlewares = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(limiter);
};

const routes = (app) => {
  app.use('/adoptionSystem/v1/auth', authRoutes)
};

const connectDB = async () => {
  try {
    await dbConnection();
    console.log("successful connection");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};

export const initServer = async () => {
  const app = express();
  const port = process.env.PORT || 3000;
  try {
    middlewares(app);
    conectarDB();
    routes(app);
    app.listen(port);
    console.log(`Server running on port ${port}`);
  } catch (err) {
    console.log(`Server init failed: ${err}`);
  }

  
};
import cors from "cors";
import express from "express";
import { AppInterface } from "../interface/app/Interface";
import { Controller } from "../interface/controller/Interface";

export class ApplicationExpress implements AppInterface {
  private app: express.Application;
  private port: number;

  constructor(controllers: Controller[], port: number = 3000) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Habilita o CORS para todas as origens
    this.app.use(cors());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.app.use("/", controller.get_router());
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Running on port " + this.port);
    });
  }
}

import express from "express";
import { Controller } from "../interface/controller/Interface";
import { AppInterface } from "../interface/app/Interface";

export class ApplicationExpress implements AppInterface {

    private app: express.Application;
    private port: number;

    constructor(controllers: Controller[], port: number = 3000){
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
    }

    private initializeControllers(controllers: Controller[]){
        controllers.forEach((controller: Controller) => {
            this.app.use('/', controller.get_router());
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log("Running on port " + this.port);
        })
    }
}
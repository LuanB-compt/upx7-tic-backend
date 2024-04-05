import express from "express";

class Application {

    private app: express.Application;
    private port: number;

    constructor(controllers: any[], port: number = 3000){
        this.app = express();
        this.port = port;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
    }

    private initializeControllers(controllers: any[]){
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log("Running on port " + this.port);
        })
    }
}

export default Application;
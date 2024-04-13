import Application from "./src/app/Application";
import { ReportController } from "./src/controller/ReportController";
import { CityController } from "./src/controller/CityController";
import { ServantController } from "./src/controller/ServantController";

const app = new Application([new ReportController(), new CityController(), new ServantController()], 3000);
app.listen();
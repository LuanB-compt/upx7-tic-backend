import Application from "./src/app/Application";
import { ReportController } from "./src/controller/ReportController";
import { CityController } from "./src/controller/CityController";

const app = new Application([new ReportController(), new CityController()], 3000);
app.listen();
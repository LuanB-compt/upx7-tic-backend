import Application from "./src/Application";
import { ReportExpressController } from "./src/controller/ReportExpressController";
import { CityExpressController } from "./src/controller/CityExpressController";

const app = new Application([new ReportExpressController(), new CityExpressController()], 3000);
app.listen();
import Application from "./src/Application";
import { ReportExpressController } from "./src/controller/ReportExpressController";

const app = new Application([new ReportExpressController()], 3000);
app.listen();
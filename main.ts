import Application from "./src/Application";
import { ReportExpressController } from "./src/controller/ReportExpressController";

const app = new Application([new ReportExpressController()]);
app.listen();
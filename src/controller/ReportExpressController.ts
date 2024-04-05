import { Router, Request, Response } from "express";
import { Controller } from "./Interface";
import { ReportService } from "../service/ReportService";

export class ReportExpressController implements Controller {

    private readonly service: ReportService = new ReportService();
    public router = Router();

    constructor(){
        this.init_routes();
    };

    public init_routes() {
        throw new Error("not Implemented") ;
    }
    public async get_read(req: Request, res: Response){
        throw new Error("not Implemented") ;
    };
    public async get_readByID(req: Request, res: Response){
        throw new Error("not Implemented") ;
    };
    public async post_create(req: Request, res: Response){
        throw new Error("not Implemented") ;
    };
    public async put_update(req: Request, res: Response){
        throw new Error("not Implemented") ;
    };
    public async delete_delete(req: Request, res: Response){
        throw new Error("not Implemented") ;
    };
};
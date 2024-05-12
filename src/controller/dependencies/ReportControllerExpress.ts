import { Router, Request, Response } from "express";
import { Controller } from "../../interface/controller/Interface";
import { ReportService } from "../../service/ReportService";

export class ReportControllerExpress implements Controller {

    private readonly service: ReportService = new ReportService();
    private router: Router;
    private path: string = '/report';

    constructor(){
        this.router = Router();
        this.init_routes();
    };

    private init_routes() {
        this.router.get(this.path + '/:id', this.get_readByID.bind(this));
        this.router.get(this.path + '/close/:city', this.get_close_reports.bind(this));
        this.router.get(this.path + '/open/:city', this.get_open_reports.bind(this));
    
        this.router.post(this.path, this.post_create.bind(this));
    };

    public get_router() {
        return this.router;    
    }

    public async get_close_reports(req: Request, res: Response){
        const response = await this.service.read_by_city(req.params.city, true);
        if (response != undefined) {
            res.status(200).json(response);
        }else {
            res.status(400).json({message:"error"});
        };
    };

    public async get_open_reports(req: Request, res: Response){
        const response = await this.service.read_by_city(req.params.city, false);
        if (response != undefined) {
            res.status(200).json(response);
        }else {
            res.status(400).json({message:"error"});
        };
    };

    public async get_read(req: Request, res: Response){
        const response = await this.service.read();
        if (response != undefined) {
            res.status(200).json(response);
        }else {
            res.status(400).json({message:"error"});
        };
    };

    public async get_readByID(req: Request, res: Response){
        const response = await this.service.readByID(+req.params.id);
        if (response != undefined) {
            res.status(200).json(response);
        }else {
            res.status(400).json({message:"error"});
        };
    };

    public async post_create(req: Request, res: Response){
        const response = await this.service.create(req.body);
        if (response != undefined) {
            res.status(200).json(response);
        }else {
            res.status(400).json({message:"error"});
        };
    };

    public async put_update(req: Request, res: Response){
        const response = await this.service.update(+req.params.id, req.body);
        if (response != undefined) {
            res.status(200).json(response);
        }else {
            res.status(400).json({message:"error"});
        };
    };

    public async delete_delete(req: Request, res: Response){
        const response = await this.service.delete(+req.params.id);
        if (response != undefined) {
            res.status(200).json(response);
        }else {
            res.status(400).json({message:"error"});
        };
    };

};

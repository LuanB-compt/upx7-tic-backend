import { Router, Request, Response } from "express";
import { Controller } from "./Interface";
import { CityService } from "../service/CityService";

export class ReportExpressController implements Controller {

    private readonly service: CityService = new CityService();
    private router: Router;
    private path: string = '/city';

    constructor(){
        this.router = Router();
        this.init_routes();
    };

    private init_routes() {
        this.router.get(this.path, this.get_read.bind(this));
        this.router.get(this.path + '/:id', this.get_readByID.bind(this));
        this.router.post(this.path, this.post_create.bind(this));
        this.router.put(this.path + '/:id', this.put_update.bind(this));
        this.router.delete(this.path + '/:id', this.delete_delete.bind(this));
    };

    public get_router() {
        return this.router;    
    }

    public async get_read(req: Request, res: Response){
        res.status(501);
    };

    public async get_readByID(req: Request, res: Response){
        res.status(501);
    };

    public async post_create(req: Request, res: Response){
        res.status(501);
    };

    public async put_update(req: Request, res: Response){
        res.status(501);
    };

    public async delete_delete(req: Request, res: Response){
        res.status(501);
    };

};
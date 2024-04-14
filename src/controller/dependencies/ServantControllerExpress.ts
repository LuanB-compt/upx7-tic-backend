import { Router, Request, Response } from "express";
import { Controller } from "../interface/Interface";
import { ServantService } from "../../service/ServantService";

export class ServantControllerExpress implements Controller {

    private readonly service: ServantService = new ServantService();
    private router: Router;
    private path: string = '/servant';

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
        this.router.post(this.path + '/signup', this.signup.bind(this));
        this.router.post(this.path + '/signin', this.signin.bind(this));
    };

    public get_router() {
        return this.router;    
    }

    public async get_read(req: Request, res: Response){
        res.status(501);
    };

    public async get_readByID(req: Request, res: Response){
        const response = await this.service.readByID(+req.params.id);
        if (response == undefined) {
            res.status(400).json({message:"Error"});
        } else {
            res.status(200).json(response);
        };
    };

    public async post_create(req: Request, res: Response){
        const response = await this.service.create(req.body);
        if (response == undefined) {
            res.status(400).json({message:"Error"});
        } else {
            res.status(200).json(response);
        };
    };

    public async put_update(req: Request, res: Response){
        const response = await this.service.update(+req.params.id, req.body);
        if (response == undefined) {
            res.status(400).json({message:"Error"});
        } else {
            res.status(200).json(response);
        };
    };

    public async delete_delete(req: Request, res: Response){
        const response = await this.service.delete(+req.params.id);
        if (response == undefined) {
            res.status(400).json({message:"Error"});
        } else {
            res.status(200).json(response);
        };
    };

    public async signup(req: Request, res: Response){
        const response = await this.service.signup(req.body);
        if (response == undefined) {
            res.status(500).json({message:"Error"});
        } else {
            res.status(200).json(response);
        };
    };

    public async signin(req: Request, res: Response){
        const {functional_identity, password} = req.body;
        const response = await this.service.signin(functional_identity, password);
        if (response == undefined) {
            res.status(500).json({message:"Error"});
        } else if (response == false) {
            res.status(501).json(response);
        } else {
            res.status(200).json(response);
        };
    };

};
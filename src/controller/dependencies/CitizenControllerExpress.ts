import { Router, Request, Response } from "express";
import { Controller } from "../../interface/controller/Interface";
import { CitizenService } from "../../service/CitizenService";

export class CitizenControllerExpress implements Controller {

    private readonly service: CitizenService = new CitizenService();
    private router: Router;
    private path: string = '/citizen';

    constructor(){
        this.router = Router();
        this.init_routes();
    };

    private init_routes() {
        this.router.post(this.path + '/signup', this.signup.bind(this));
        this.router.post(this.path + '/signin', this.signin.bind(this));
    };

    public get_router() {
        return this.router;    
    }

    public async get_read(req: Request, res: Response){
        res.status(501).json({});
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
        const {cpf, password} = req.body;
        const response = await this.service.signin(cpf, password);
        if (response == undefined) {
            res.status(500).json({message:"Error"});
        } else {
            res.status(200).json(response);
        };
    };

};
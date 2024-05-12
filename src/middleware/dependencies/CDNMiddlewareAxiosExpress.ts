import axios, {AxiosResponse} from 'axios';
import { Request, Response, NextFunction } from "express";
import { Configer } from "../../config/Configer";


export class CDNMiddlewareLocal {

    private readonly config: Configer = new Configer("config/CDN.yaml");

    constructor() {};

    private handle_file(file: Express.Multer.File): Blob{
        var file_blob = new Blob([file.buffer]);
        file_blob = file_blob.slice(0, file_blob.size, file.mimetype);
        return file_blob;
    };

    private async send_img(file: Express.Multer.File): Promise<AxiosResponse<any, any>>{
        var to_cdn = new FormData();
        to_cdn.set('file', this.handle_file(file), file.originalname);
        return await axios({
            url: this.config.get_config()['CDN']['url'],
            method: 'post',
            headers: { "Content-Type": "multipart/form-data" },
            data: to_cdn
        });
    };

    public async save_img(req: Request, res: Response, next: NextFunction) {
        const file: Express.Multer.File | undefined = req.file;
        if(file == undefined){
            res.status(400).json({"message": "No image received"});
            return;
        };
        
        var file_blob = new Blob([file.buffer]);
        file_blob = file_blob.slice(0, file_blob.size, file.mimetype);
        
        var to_cdn = new FormData();
        to_cdn.set('file', file_blob, file.originalname);
        
        const response = await axios({
            url: "http://localhost:5000",
            method: 'post',
            headers: { "Content-Type": "multipart/form-data" },
            data: to_cdn
        });
        if(response == undefined){
            res.status(400).json({"message": "Can't save in CDN"});
            return ;
        };

        var data = req.body;
        data['photo_link'] = response.data['link'];
        res.locals.data = data;
        next();
    };

}
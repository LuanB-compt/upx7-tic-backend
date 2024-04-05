import { Repository } from "./Interface";
import { Report } from "../entity/Report";

export class ReportRepository implements Repository {

    constructor(){
        this.sync();
    };

    public async sync(){
        await Report.sync();
    };

    public async read(): Promise<Report[] | undefined> {
        const response = await Report.findAll();
        if (response == undefined){
            return undefined;
        };
        return response;
    };

    public async readByID(): Promise<any | undefined> {
        throw new Error("not Implemented") ;
    };

    public async create(data: any): Promise<Report | undefined> {
        const response = await Report.create(data);
        if (response == undefined){
            return undefined;
        };
        return response;
    };

    public async update(id: number, data: any): Promise<Report | undefined> {
        const obj = await Report.findByPk(id)
        if (obj == undefined){
            return undefined;
        };
        const response = await obj.update(data);
        if (response == undefined){
            return undefined;
        };
        return response;
    };

    public async delete(id: number): Promise<any | undefined> {
        const obj = await Report.findByPk(id)
        if (obj == undefined){
            return undefined;
        };
        const response = await obj.destroy();
        if (response == undefined){
            return undefined;
        };
        return response;
    };

};
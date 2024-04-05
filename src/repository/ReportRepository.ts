import { Repository } from "./Interface";
import { Report } from "../entity/Report";

export class ReportRepository implements Repository {

    constructor(){
        this.sync();
    };

    public async sync(){
        await Report.sync();
    }

    public async read(): Promise<any | undefined> {
        const response = await Report.findAll();
        if (response == undefined){
            return undefined;
        };
        return response;
    }

    public async readByID(): Promise<any | undefined> {
        throw new Error("not Implemented") ;
    };

    public async create(data: any): Promise<any | undefined> {
        throw new Error("not Implemented") ;
    }

    public async update(): Promise<any | undefined> {
        throw new Error("not Implemented") ;
    };

    public async delete(): Promise<any | undefined> {
        throw new Error("not Implemented") ;
    };

};
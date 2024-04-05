import { ReportRepository } from "../repository/ReportRepository";
import { Service } from "./Interface";

export class ReportService implements Service {

    private readonly repository: ReportRepository = new ReportRepository();

    constructor(){};

    public async read(): Promise<any | undefined> {
        return await this.repository.read();
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
import { ReportRepository } from "../repository/ReportRepository";
import { Service } from "./interface/Interface";

export class ReportService implements Service {

    private readonly repository: ReportRepository = new ReportRepository();

    constructor(){};

    public async read_by_city(city: string, status: boolean | undefined = undefined): Promise<any | undefined>{
        return await this.repository.read_by_city(city, status);
    }

    public async read(): Promise<any | undefined> {
        return await this.repository.read();
    };

    public async readByID(id: number): Promise<any | undefined> {
        return await this.repository.readByID(id);
    };

    public async create(data: any): Promise<any | undefined> {
        return await this.repository.create(data);
    };

    public async update(id: number, data: any): Promise<any | undefined> {
        return await this.repository.update(id, data);
    };

    public async delete(id: number): Promise<any | undefined> {
        return await this.repository.delete(id);
    };

};

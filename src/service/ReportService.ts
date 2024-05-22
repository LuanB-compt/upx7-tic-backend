import { ReportRepository } from "../repository/ReportRepository";
import { Service } from "../interface/service/Interface";

export class ReportService implements Service {

    private readonly repository: ReportRepository = new ReportRepository();

    constructor(){};

    public async read_by_city(city: string, status: boolean | undefined = undefined): Promise<any | undefined>{
        return await this.repository.read_by_city(city, status);
    };

    public async read_by_user(email: string, status: boolean | undefined = undefined): Promise<any | undefined>{
        return await this.repository.read_by_user(email, status);
    };

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

    public async upvotes(id: number): Promise<any | undefined> {
        const report = await this.repository.readByID(id);
        if (report == undefined){
            return undefined;
        };
        let upvote = report.up_votes;
        upvote = upvote + 1;
        return await this.update(id, {"up_votes": upvote});
    };

    public async delete(id: number): Promise<any | undefined> {
        return await this.repository.delete(id);
    };

};

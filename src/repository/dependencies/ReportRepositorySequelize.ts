import { Repository } from "../../interface/repository/Interface";
import { Report } from "../../entity/Report";

export class ReportRepositorySequelize implements Repository {

    constructor(){
        this.sync();
    };

    private async sync(){
        await Report.sync();
    };

    public async read_by_city(city: string, status: boolean | undefined = undefined): Promise<Report[] | undefined> {
        var response: Report[];
        if(status == undefined){
            response = await Report.findAll({
                where:{city_name: city}
            });
        } else {
            response = await Report.findAll({
                where:{city_name: city, status: status}
            });
        };
        if (response==undefined){
            return undefined;
        };
        return response;
    }

    public async read_by_user(email: string, status: boolean | undefined = undefined): Promise<Report[] | undefined> {
        var response: Report[];
        if(status == undefined){
            response = await Report.findAll({
                where:{citizen_email: email}
            });
        } else {
            response = await Report.findAll({
                where:{citizen_email: email, status: status}
            });
        };
        if (response==undefined){
            return undefined;
        };
        return response;
    }

    public async read(): Promise<Report[] | undefined> {
        const response = await Report.findAll();
        if (response == undefined){
            return undefined;
        };
        return response;
    };

    public async readByID(id: number): Promise<Report | undefined> {
        const response = await Report.findByPk(id);
        if (response == undefined){
            return undefined;
        };
        return response;
    };

    public async create(data: any): Promise<number | undefined> {
        const response = await Report.create(data);
        if (response == undefined){
            return undefined;
        };
        return response.report_id;
    };

    public async update(id: number, data: any): Promise<number | undefined> {
        const obj = await Report.findByPk(id)
        if (obj == undefined){
            return undefined;
        };
        const response = await obj.update(data);
        if (response == undefined){
            return undefined;
        };
        return response.report_id;
    };

    public async delete(id: number): Promise<number | undefined> {
        const obj = await Report.findByPk(id)
        if (obj == undefined){
            return undefined;
        };
        const response = await obj.destroy();
        if (response == undefined){
            return undefined;
        };
        return obj.report_id;
    };

};
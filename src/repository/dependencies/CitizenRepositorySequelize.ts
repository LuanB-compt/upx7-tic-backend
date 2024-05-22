import { Repository } from "../../interface/repository/Interface";
import { Citizen } from "../../entity/Citizen";

export class CitizenRepositorySequelize implements Repository {

    constructor(){
        this.sync();
    };

    private async sync(){
        await Citizen.sync();
    };

    public async read(): Promise<Citizen[] | undefined> {
        const response = await Citizen.findAll();
        if (response == undefined){
            return undefined;
        };
        return response;
    };

    public async readByID(id: number): Promise<Citizen | undefined> {
        const response = await Citizen.findByPk(id);
        if (response == undefined){
            return undefined;
        };
        return response;
    };

    public async readByCPF(cpf: string): Promise<Citizen | undefined> {
        const response = await Citizen.findOne({
            where: {cpf: cpf}
        });
        if (response == undefined){
            return undefined;
        };
        return response;
    };

    public async create(data: any): Promise<number | undefined> {
        const response = await Citizen.create(data);
        if (response == undefined){
            return undefined;
        };
        return response.citizen_id;
    };

    public async update(id: number, data: any): Promise<number | undefined> {
        const obj = await Citizen.findByPk(id)
        if (obj == undefined){
            return undefined;
        };
        const response = await obj.update(data);
        if (response == undefined){
            return undefined;
        };
        return response.citizen_id;
    };

    public async delete(id: number): Promise<number | undefined> {
        const obj = await Citizen.findByPk(id)
        if (obj == undefined){
            return undefined;
        };
        const response = await obj.destroy();
        if (response == undefined){
            return undefined;
        };
        return obj.citizen_id;
    };

};
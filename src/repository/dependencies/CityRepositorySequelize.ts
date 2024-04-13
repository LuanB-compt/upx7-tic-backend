import { Repository } from "../interface/Interface";
import { City } from "../../entity/City";

export class CityRepositorySequelize implements Repository {

    constructor(){
        this.sync();
    };

    private async sync(){
        await City.sync();
    };

    public async read(): Promise<City[] | undefined> {
        const response = await City.findAll();
        if (response == undefined){
            return undefined;
        };
        return response;
    };

    public async readByID(id: number): Promise<City | undefined> {
        const response = await City.findByPk(id);
        if (response == undefined){
            return undefined;
        };
        return response;
    };

    public async create(data: any): Promise<number | undefined> {
        const response = await City.create(data);
        if (response == undefined){
            return undefined;
        };
        return response.city_id;
    };

    public async update(id: number, data: any): Promise<number | undefined> {
        const obj = await City.findByPk(id)
        if (obj == undefined){
            return undefined;
        };
        const response = await obj.update(data);
        if (response == undefined){
            return undefined;
        };
        return response.city_id;
    };

    public async delete(id: number): Promise<number | undefined> {
        const obj = await City.findByPk(id)
        if (obj == undefined){
            return undefined;
        };
        const response = await obj.destroy();
        if (response == undefined){
            return undefined;
        };
        return obj.city_id;
    };

};
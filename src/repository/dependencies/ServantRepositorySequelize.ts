import { Repository } from "../interface/Interface";
import { Public_Servant } from "../../entity/Public_Servant";

export class ServantRepositorySequelize implements Repository {

    constructor(){
        this.sync();
    };

    private async sync(){
        await Public_Servant.sync();
    };

    public async read(): Promise<Public_Servant[] | undefined> {
        const response = await Public_Servant.findAll();
        if (response == undefined){
            return undefined;
        };
        return response;
    };

    public async readByID(id: number): Promise<Public_Servant | undefined> {
        const response = await Public_Servant.findByPk(id);
        if (response == undefined){
            return undefined;
        };
        return response;
    };

    public async create(data: any): Promise<number | undefined> {
        const response = await Public_Servant.create(data);
        if (response == undefined){
            return undefined;
        };
        return response.servant_id;
    };

    public async update(id: number, data: any): Promise<number | undefined> {
        const obj = await Public_Servant.findByPk(id)
        if (obj == undefined){
            return undefined;
        };
        const response = await obj.update(data);
        if (response == undefined){
            return undefined;
        };
        return response.servant_id;
    };

    public async delete(id: number): Promise<number | undefined> {
        const obj = await Public_Servant.findByPk(id)
        if (obj == undefined){
            return undefined;
        };
        const response = await obj.destroy();
        if (response == undefined){
            return undefined;
        };
        return obj.servant_id;
    };

};
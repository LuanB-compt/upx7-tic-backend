import { ServantRepository } from "../repository/ServantRepository";
import { Public_Servant } from "../entity/Public_Servant";
import { Service } from "./interface/Interface";

export class ServantService implements Service {

    private readonly repository: ServantRepository = new ServantRepository();

    constructor(){};

    public async read(): Promise<Public_Servant[] | undefined> {
        return await this.repository.read();
    };

    public async readByID(id: number): Promise<Public_Servant | undefined> {
        return await this.repository.readByID(id);
    };

    public async create(data: any): Promise<number | undefined> {
        return await this.repository.create(data);
    };

    public async update(id: number, data: any): Promise<number | undefined> {
        return await this.repository.update(id, data);
    };

    public async delete(id: number): Promise<number | undefined> {
        return await this.repository.delete(id);
    };

};

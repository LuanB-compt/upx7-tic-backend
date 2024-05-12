import { CityRepository } from "../repository/CityRepository";
import { City } from "../entity/City";
import { Service } from "../interface/service/Interface";

export class CityService implements Service {

    private readonly repository: CityRepository = new CityRepository();

    constructor(){};

    public async read(): Promise<City[] | undefined> {
        return await this.repository.read();
    };

    public async readByID(id: number): Promise<City | undefined> {
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

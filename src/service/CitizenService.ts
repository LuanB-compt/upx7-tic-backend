import { CitizenRepository } from "../repository/CitizenRepository";
import { AuthService } from "./AuthService";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { Citizen } from "../entity/Citizen";
import { Service } from "../interface/service/Interface";

export class CitizenService implements Service {

    private readonly middleware: AuthMiddleware = new AuthMiddleware();
    private readonly repository: CitizenRepository = new CitizenRepository();
    private readonly auth: AuthService = new AuthService();

    constructor(){};

    public async read(): Promise<Citizen[] | undefined> {
        return await this.repository.read();
    };

    public async readByID(id: number): Promise<Citizen | undefined> {
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

    public async signup(data: any): Promise<number | undefined> {
        var response = await this.repository.readByCPF(data.cpf);
        if (response != undefined){
            return undefined;
        };
        data.password = await this.middleware.passwd_hash(data.password);
        return await this.repository.create(data);
    };

    public async signin(cpf: string, passwd: string): Promise<object | undefined> {
        let response = await this.repository.readByCPF(cpf);
        if (response == undefined){
            return undefined;
        };
        let check = await this.middleware.passwd_compare(passwd, response.password);
        if(check == false){
            return undefined;
        };
        const auth_ = await this.auth.create(response.citizen_id);
        if(auth_ == undefined) {
            return undefined;
        };
        return {
            "auth":auth_,
            "id": response.citizen_id,
            "email": response.email,
            "name": response.name,
            "phone": response.phone,
            "address": response.address,
            "zip_code": response.zip_code,
            "cpf": response.cpf,
            "city_name": response.city_name
        };
    };
};
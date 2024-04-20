import { ServantRepository } from "../repository/ServantRepository";
import { AuthService } from "./AuthService";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import { Public_Servant } from "../entity/Public_Servant";
import { Service } from "./interface/Interface";

export class ServantService implements Service {

    private readonly middleware: AuthMiddleware = new AuthMiddleware();
    private readonly repository: ServantRepository = new ServantRepository();
    private readonly auth: AuthService = new AuthService();

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

    public async signup(data: any): Promise<number | undefined> {
        var response = await this.repository.readByFunctionalID(data.functional_identity);
        if (response != undefined){
            return undefined;
        };
        data.password = await this.middleware.passwd_hash(data.password);
        return await this.repository.create(data);
    };

    public async signin(functional_identity: string, passwd: string): Promise<string | undefined> {
        let response = await this.repository.readByFunctionalID(functional_identity);
        if (response == undefined){
            return undefined;
        };
        let check = await this.middleware.passwd_compare(passwd, response.password);
        if(check == false){
            return undefined;
        };
        const auth_ = await this.auth.create(response.servant_id);
        if(auth_ == undefined) {
            return undefined;
        };
        return auth_;
    };

};

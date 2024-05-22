import { Auth } from "../../entity/Auth";

export class AuthRepositorySequelize {

    constructor(){
        this.sync();
    };

    private async sync(){
        await Auth.sync();
    };

    public async readByUser(token: string, user_id: number): Promise<Auth | undefined>{
        const response = await Auth.findOne({
            where: {user_id: user_id, token: token}
        });
        if (response == undefined){ return undefined};
        return response;
    }

    public async readByToken(token: string): Promise<Auth | undefined> {
        const response = await Auth.findOne({
            where: {token: token}
        });
        if (response == undefined){
            return undefined;
        };
        return response;
    };

    public async create(data: any): Promise<Auth | undefined> {
        const response = await Auth.create(data);
        if (response == undefined){
            return undefined;
        };
        response.update({"expiration": new Date().setDate(new Date().getDate() + 5)});
        return response;
    };

    public async update(id: number, data: any): Promise<Auth | undefined> {
        const obj = await Auth.findByPk(id)
        if (obj == undefined){
            return undefined;
        };
        const response = await obj.update(data);
        if (response == undefined){
            return undefined;
        };
        return response;
    }

    public async delete(id: number): Promise<Auth | undefined> {
        const obj = await Auth.findByPk(id)
        if (obj == undefined){
            return undefined;
        };
        const response = await obj.destroy();
        if (response == undefined){
            return undefined;
        };
        return obj;
    };

};
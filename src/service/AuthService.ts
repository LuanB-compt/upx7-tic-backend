import { Auth } from "../entity/Auth";
import { AuthRepository } from "../repository/AuthRepository";
import crypto from "crypto";

export class AuthService {

    private readonly repository: AuthRepository = new AuthRepository();
    private random_bytes: number = 128;

    constructor(){};

    private create_jwt() {
        return crypto.randomBytes(this.random_bytes).toString('hex');
    };

    public async verifyByUser(token: string): Promise<boolean> {
        var user_id = token.split('//')[-1];
        const response = await this.check(token);
        if (response == false){return false};
        const result = await this.repository.readByUser(token, Number(user_id));
        if (result == undefined) {return false};
        return true;
    }

    public async check(token: string): Promise<boolean> {
        const response = await this.repository.readByToken(token);
        if (response == undefined) {return false};
        const now = new Date();
        if (now > response.expiration) {return false};
        return true;
    };

    public async create(user_id: number): Promise<string | undefined> {
        var token = this.create_jwt();
        token = token + '//' + user_id.toString();
        const result = await this.repository.create(
            {user_id: user_id, token: token}
        );
        if(result == undefined) {return undefined};
        return result.token;
    };


}
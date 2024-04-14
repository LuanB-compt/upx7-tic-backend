import bcrypt from "bcrypt";

export class ServantMiddlewareBcrypt {
    private salt_or_rounds: number = 10;

    constructor(){};

    public async passwd_hash(password: string): Promise<string>{
        return await bcrypt.hash(password, this.salt_or_rounds);
    };

    public async passwd_compare(to_check: string, to_compare: string): Promise<boolean> {
        return await bcrypt.compare(to_check, to_compare);
    };

};
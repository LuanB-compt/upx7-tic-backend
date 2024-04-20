import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../service/AuthService";

export class AuthMiddlewareExpress {

    private salt_or_rounds: number = 10;
    private readonly service: AuthService = new AuthService();

    public async passwd_hash(password: string): Promise<string>{
        return await bcrypt.hash(password, this.salt_or_rounds);
    };

    public async passwd_compare(to_check: string, to_compare: string): Promise<boolean> {
        return await bcrypt.compare(to_check, to_compare);
    };

    public async verify_jwt(req: Request, res: Response, next: NextFunction) {
        const token = req.header('Authorization');
        if (token == undefined) {
            res.status(401).json({message:"Without authorization"});
        } else {
            const response = await this.service.verifyByUser(token);
            if (response == false) {
                res.status(406).json({message:"Not authorized"});
            } else {next()};
        };
    };

};
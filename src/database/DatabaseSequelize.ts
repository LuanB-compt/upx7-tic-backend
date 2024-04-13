import { Configer } from "../config/Configer";
import { Database } from "./Interface";
import { Sequelize } from "sequelize";

export class DatabaseSequelize implements Database{

    private sequelize: Sequelize | undefined = undefined;
    private readonly configer = new Configer('./src/config/database.yaml');
    private url: string = '';
    
    constructor(path: string, dialect: string){
        this.create_url_connection();
        this.connect()
    }

    private create_url_connection() {
        this.url = this.configer.get_config()['Database']['dev']['dialect']+'://'+this.configer.get_config()['Database']['dev']['path'];
    }

    public async connect(): Promise<true | undefined> {
        this.sequelize = new Sequelize(this.url);
        await this.sequelize.authenticate()
        .then(() => {
            console.log('Database connected!');
            return true;
        })
        .catch((error) => {
            console.error('Error to connect Database:', error.message);
            return undefined;
        });
        return ;
    }

    public async disconnect(): Promise<true | undefined> {
        if(this.sequelize == undefined) {
            return undefined;
        }
        await this.sequelize.close();
        return true;
    };

    public get_db(): any{
        return this.sequelize;
    };

}

import { Database } from "./Interface";
import { Sequelize } from "sequelize";

export class DatabaseSequelize implements Database{

    private sequelize: Sequelize | undefined = undefined;
    private path: string = '';
    private url: string = '';
    private dialect: string = '';

    constructor(path: string, dialect: string){
        this.path = path,
        this.dialect = dialect;
        this.create_url_connection();
        this.connect()
    }

    private create_url_connection() {
        this.url = this.dialect + '://' + this.path;
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

    public get_dialect(): string {
        return this.dialect;
    };
}

//export const databaseSequelize = new DatabaseSequelize('../../data/test.sqlite', 'sqlite');
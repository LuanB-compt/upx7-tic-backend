import { Sequelize } from "sequelize";
import { Configer } from "../config/Configer";


export function getDatabase(): Sequelize {
    const config = new Configer('./config/database.yaml');
    const url = config.get_config()['Database']['dev']['dialect']+'://'+config.get_config()['Database']['dev']['path'];
    const db: Sequelize = new Sequelize(url);
    db.authenticate()
    .then(() => {
        console.log('Database connected!');
    })
    .catch((error) => {
        console.error('Error to connect Database:', error.message);
    });
    return db;
}

export const sequelize = getDatabase();
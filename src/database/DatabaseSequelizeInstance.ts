import { Sequelize } from "sequelize";


export function getDatabase(): Sequelize {
    const db: Sequelize = new Sequelize('sqlite://./data/test.sqlite');
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
import { Model, DataTypes, CreationOptional } from 'sequelize';
import { sequelize } from '../database/DatabaseSequelizeInstance';

export class Citizen extends Model {
    declare citizen_id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare phone: string;
    declare address: string;
    declare zip_code: string;
    declare cpf: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
};

Citizen.init({
    citizen_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    zip_code: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
    },
}, {sequelize, tableName: 'Citizen', modelName: 'Citizen', timestamps: false});

sequelize.sync();

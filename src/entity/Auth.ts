import { Model, DataTypes, CreationOptional, NOW } from 'sequelize';
import { sequelize } from '../database/DatabaseSequelizeInstance';

export class Auth extends Model {
    declare jwt_id: number;
    declare user_id: number;
    declare token: string;
    declare created_date: Date;
    declare expiration: Date;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
};

Auth.init({
    jwt_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    created_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW
    },
    expiration: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {sequelize, tableName: 'Auth', modelName: 'Auth', timestamps: false});

sequelize.sync();

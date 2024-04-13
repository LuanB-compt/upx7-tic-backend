import { Model, DataTypes, CreationOptional } from 'sequelize';
import { sequelize } from '../database/DatabaseSequelizeInstance';

export class Public_Servant extends Model {
    declare servant_id: number;
    declare name: string;
    declare functional_identity: string;
    declare email: string;
    declare passowrd: string;
    declare phone: string;

    declare city_id: number;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
};

Public_Servant.init({
    servant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    functional_identity: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    passowrd: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    city_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'City',
            key: 'city_id'
        },
        allowNull: false
    }
}, {sequelize, tableName: 'Public_Servant', modelName: 'Public_Servant', timestamps: false});

sequelize.sync();

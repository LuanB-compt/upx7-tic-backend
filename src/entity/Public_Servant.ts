import { Model, DataTypes, CreationOptional } from 'sequelize';
import { sequelize } from '../database/DatabaseSequelizeInstance';

export class Public_Servant extends Model {
    declare servant_id: number;
    declare name: string;
    declare functional_identity: string;
    declare email: string;
    declare password: string;
    declare phone: string;

    declare city_name: string;

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
        allowNull: false
    },
    city_name: {
        type: DataTypes.STRING(25),
        references: {
            model: 'City',
            key: 'name'
        },
        allowNull: false
    }
}, {sequelize, tableName: 'Public_Servant', modelName: 'Public_Servant', timestamps: false});

sequelize.sync();

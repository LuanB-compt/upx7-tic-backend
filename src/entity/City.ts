import { Model, DataTypes, CreationOptional } from 'sequelize';
import { Report } from './Report';
import { Public_Servant } from './Public_Servant';
import { sequelize } from '../database/DatabaseSequelizeInstance';

export class City extends Model {
    declare city_id: number;
    declare name: string;
    declare state: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
};

City.init({
    city_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    name: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true
    },
    state: {
        type: DataTypes.STRING(2),
        allowNull: false,
    }
}, {sequelize, tableName: 'City', modelName: 'City', timestamps: false});

City.hasMany(Report);
City.hasOne(Public_Servant);

sequelize.sync();

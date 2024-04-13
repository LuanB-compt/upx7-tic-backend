import { Model, DataTypes, CreationOptional } from 'sequelize';
import { sequelize } from '../database/DatabaseSequelizeInstance';

export class City extends Model {
    declare city_id: number;
    declare name: string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

City.init({
    city_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    
}, {sequelize, tableName: 'City', modelName: 'City', timestamps: false})

sequelize.sync();

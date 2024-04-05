import { Model, DataTypes, Sequelize, CreationOptional } from 'sequelize';
import { sequelize } from '../database/DatabaseSequelizeInstance';

export class Report extends Model {
    declare report_id: number;
    declare report_date: Date;
    declare status: boolean;
    declare description: string;
    declare localtion: string;
    declare photo_link: string;
    declare up_votes: number;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Report.init({
    report_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    report_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    localtion: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    photo_link: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    up_votes: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {sequelize, tableName: 'Report', modelName: 'Report', timestamps: false})

sequelize.sync();

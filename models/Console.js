const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Console extends Model {}

Console.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        // slug: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     unique: true,
        // },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'console',
    },
);

module.exports = Console;
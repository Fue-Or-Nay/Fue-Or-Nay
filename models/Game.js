const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {}

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        release_date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isDate: true,
            },
        },
        rating_scale: {
            type: DataTypes.STRING,
            allowNull: true,    
        },
        rating_avg: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "0.0",
            validate: {
                isDecimal: true,
            }
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        esrb_rating: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'game',
    },
);

module.exports = Game;
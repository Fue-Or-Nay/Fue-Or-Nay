const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ConsoleGame extends Model { }

ConsoleGame.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        game_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'game',
                key: 'id',
            },
        },
        console_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'console',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'console_game',
    },
);

module.exports = ConsoleGame;
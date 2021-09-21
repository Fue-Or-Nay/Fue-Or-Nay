const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        num_rating: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
            },
        },
        review_title: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                len: [6, 20],
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        helpful: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        not_helpful: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        creation_date: {
            type: DataTypes.DATEONLY,
            defaultValue: Sequelize.NOW,
        },
        game_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'game',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'review',
    },
);

module.exports = Review;
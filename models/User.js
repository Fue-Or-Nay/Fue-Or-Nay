const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
            },
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [5, 12],
            },
        },
        creation_date: {
            type: DataTypes.DATEONLY,
            defaultValue: Sequelize.NOW,
        },
        reputation_level: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Cellar Dweller'
        },
        review_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        feedback_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        hooks: {
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    },
);

module.exports = User;
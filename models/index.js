const Console = require('./Console');
const Game = require('./Game');
const Review = require('./Review');
const User = require('./User');
const consoleGame = require('./consoleGame');
const userGame = require('./userGame');


Console.belongsToMany(Game, {
    through: 'console_game',
    onDelete: 'CASCADE',
});

Game.belongsToMany(Console, {
    through: 'console_game',
    onDelete: 'CASCADE',
});

Game.hasMany(Review, {
    foreignKey: 'game_id',
    onDelete: 'CASCADE',
});

User.belongsToMany(Game, {
    through: 'user_game',
    onDelete: 'CASCADE',
});

Game.belongsToMany(User, {
    through: 'user_game',
    onDelete: 'CASCADE'
});

User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

module.exports = {
    Console,
    Game,
    Review,
    User,
};
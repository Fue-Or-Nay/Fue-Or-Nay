const sequelize = require('../config/connection');
const seedUser = require('./userData.json');
const seedConsole = require('./consoleData.json');
const seedGames = require('./gameData.json');
const seedReviews = require('./reviewData.json');
const seedConsoleGames = require('./consoleGameData.json');
const seedUserGames = require('./userGameData.json');
const consoleGame = require('../models/consoleGame');
const userGame = require('../models/userGame');
const { User, Console, Game, Review } = require('../models');


const seedAll = async () => {
    await sequelize.sync({ force: true });

    console.log('\n----- DATABASE SYNCED -----\n');

    await User.bulkCreate(seedUser, {
        individualHooks: true,
        returning: true,
    });

    console.log('\n----- USERS SEEDED -----\n');

    await Console.bulkCreate(seedConsole);

    console.log('\n----- CONSOLES SEEDED -----\n');

    await Game.bulkCreate(seedGames);

    console.log('\n----- GAMES SEEDED -----\n');

    await Review.bulkCreate(seedReviews);

    console.log('\n----- REVIEWS SEEDED -----\n');

    await consoleGame.bulkCreate(seedConsoleGames);

    console.log('\n----- CONSOLE GAMES SEEDED -----\n');

    await userGame.bulkCreate(seedUserGames);

    console.log('\n----- USER GAMES SEEDED -----\n');

    process.exit(0);
};

seedAll();
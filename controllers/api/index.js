const router = require('express').Router();
const gameRoutes = require('./game-routes');
const userRoutes = require('./user-routes.js');
const consoleRoutes = require('./console-routes');
const reviewRoutes = require('./review-routes');

router.use('/games', gameRoutes);
router.use('/users', userRoutes);
router.use('/consoles', consoleRoutes);
router.use('/reviews', reviewRoutes);


module.exports = router;
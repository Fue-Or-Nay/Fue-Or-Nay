const router = require('express').Router();
const consoleGame = require('../../models/consoleGame');
const { Game, Console, Review } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const allGames = await Game.findAll({
            include: [{model: Console}, {model: Review}],
        });

        res.status(200).json(allGames);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const singleGame = await Game.findByPk(req.params.id, {
            include: [{model: Review}, {model: Console}],
        });

        if (!singleGame) {
            res.status(404).json({message: 'No game is associated with this ID!'});
            return;
        }
        res.status(200).json(singleGame);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', (req, res) => {
    
    Game.create(req.body)
    .then((game) => {

        if (req.body.consoleIds) {
            const userConsoleArray = req.body.consoleIds.map((console_id) => {
                return {
                    console_id: console_id,
                    game_id: game.id,
                };
            });
            return consoleGame.bulkCreate(userConsoleArray);
        }
        res.status(200).json(game);
    })
    .then((newGame) => res.status(200).json(newGame))
    // .catch((err) => {
    //     res.status(400).json(err);
    // });
});

router.put('/:id', (req, res) => {

    Game.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
    .then((game) => {

        if (req.body.consoleIds.length) {
            const userConsoleArray = req.body.consoleIds.map((console_id) => {
                return {
                    console_id: console_id,
                    game_id: game.id,
                };
            });
            return consoleGame.bulkCreate(userConsoleArray);
        }
        res.status(200).json(game);
    })
    .then((updateGame) => res.status(200).json(updateGame))
    .catch((err) => {
        res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
    
    Game.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((deletedGame) => res.status(200).json(deletedGame))
    .catch((err) => {
        res.status(400).json(err);
    });
});

module.exports = router;
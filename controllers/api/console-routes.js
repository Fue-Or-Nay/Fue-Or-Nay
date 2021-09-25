const router = require('express').Router();
const consoleGame = require('../../models/consoleGame');
const { Game, Console } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const allConsoles = await Console.findAll({
            include: { model: Game },
        });

        res.status(200).json(allConsoles);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const singleConsole = await Console.findByPk(req.params.id, {
            include: { model: Game },
        });

        if (!singleConsole) {
            res.status(404).json({ message: 'No console is associated with this ID!' });
            return;
        }
        res.status(200).json(singleConsole);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', (req, res) => {

    Console.create(req.body)
        .then((console) => {

            if (req.body.gameIds) {
                const userGameArray = req.body.gameIds.map((game_id) => {
                    return {
                        console_id: console.id,
                        game_id: game_id,
                    };
                });
                return consoleGame.bulkCreate(userGameArray);
            }
            res.status(200).json(console);
        })
        .then((newConsole) => res.status(200).json(newConsole))
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.put('/:id', (req, res) => {

    Console.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((console) => {

            if (req.body.gameIds.length) {
                const userGameArray = req.body.gameIds.map((game_id) => {
                    return {
                        console_id: console.id,
                        game_id: game_id,
                    };
                });
                return consoleGame.bulkCreate(userGameArray);
            }
            res.status(200).json(console);
        })
        .then((newConsole) => res.status(200).json(newConsole))
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.delete('/:id', (req, res) => {

    Console.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((deletedConsole) => res.status(200).json(deletedConsole))
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;
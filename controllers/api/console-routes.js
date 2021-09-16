const router = require('express').Router();
const { User, Game, Console } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const allConsoles = await Console.findAll({
            include: {model: Game},
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
            include: {model: Game},
        });

        if (!singleConsole) {
            res.status(404).json({message: 'No user is associated with this ID!'});
            return;
        }
        res.status(200).json(singleConsole);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
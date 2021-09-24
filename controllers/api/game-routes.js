const router = require('express').Router();
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
            res.status(404).json({message: 'No user is associated with this ID!'});
            return;
        }
        res.status(200).json(singleGame);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
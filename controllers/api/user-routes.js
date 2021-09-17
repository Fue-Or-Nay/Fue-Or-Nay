const router = require('express').Router();
const userGame = require('../../models/userGame');
const { User, Game, Review } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.findAll({
            include: [{model: Review}, {model: Game}],
        });

        res.status(200).json(allUsers);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const singleUser = await User.findByPk(req.params.id, {
            include: [{model: Review}, {model: Game}],
        });

        if (!singleUser) {
            res.status(404).json({message: 'No user is associated with this ID!'});
            return;
        }
        res.status(200).json(singleUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', (req, res) => {

    User.create(req.body)
    .then((user) => {

        if (req.body.gameIds.length) {
            const userGameArray = req.body.gameIds.map((game_id) => {
                return {
                    user_id: user.id,
                    game_id: game_id,
                };
            });
            return userGame.bulkCreate(userGameArray);
        }
        res.status(200).json(user);
    })
    .then((userGameIds) => res.status(200).json(userGameIds))
    .catch((err) => {
        res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {

    User.update(req.body, {
        where: {
            id: req.params.id,
        },
    }) 
    .then((user) => {

        if (req.body.gameIds.length) {
            const userGameArray = req.body.gameIds.map((game_id) => {
                return {
                    user_id: req.params.id,
                    game_id: game_id,
                };
            });
            return userGame.bulkCreate(userGameArray);
        }
        res.status(200).json(user);
    })
    .then((userGameIds) => res.status(200).json(userGameIds))
    .catch((err) => {
        res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
    
    User.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((deletedUser) => res.status(200).json(deletedUser))
    .catch((err) => {
        res.status(400).json(err);
    });
});
module.exports = router;
const router = require('express').Router();
const userGame = require('../../models/userGame');
const { User, Game, Review } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.findAll({
            include: [{ model: Review }, { model: Game }],
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
            include: [{ model: Review }, { model: Game }],
        });

        if (!singleUser) {
            res.status(404).json({ message: 'No user is associated with this ID!' });
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

router.post('/login', async (req, res) => {
    try {
        const userInfoCheck = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!userInfoCheck) {
            res.status(400).json({ message: "Some or all of the information entered is incorrect. Please try again!" });
            return;
        }

        const userPasswordCheck = userInfoCheck.checkPassword(req.body.password);

        if (!userPasswordCheck) {
            res.status(400).json({ message: "Some or all of the information entered is incorrect. Please try again!" });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userInfoCheck.id;
            res.status(200).json({  message: "Welcome!"})
        })

    }
    catch (err) {
        res.status(500).json(err)
    }
});

router.post('/logout', (req, res) => {
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.status(200).json({message: "You have successfully logged out!"});
        });
    }
    else {
        res.status(404).json({message: "Error logging out. Please try again!"});
    }
});



module.exports = router;
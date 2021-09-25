const router = require('express').Router();
const { Review } = require('../../models');
const { hasMany } = require('../../models/userGame');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const allReviews = await Review.findAll();

        res.status(200).json(allReviews);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const singleReview = await Review.findByPk(req.params.id);

        if (!singleReview) {
            res.status(404).json({ message: 'No review is associated with this ID!' });
            return;
        }
        res.status(200).json(singleReview);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, (req, res) => {

    Review.create({
        num_rating: req.body.num_rating,
        description: req.body.description,
        game_id: req.body.game_id,
        review_title: req.body.review_title,
        user_id: req.session.user_id
    })
        .then((newReview) => res.status(200).json(newReview))
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {

    Review.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((updateReview) => res.status(200).json(updateReview))
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {

    Review.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((deletedReview) => res.status(200).json(deletedReview))
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;
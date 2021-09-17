const router = require('express').Router();
const { Review } = require('../../models');

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
            res.status(404).json({message: 'No review is associated with this ID!'});
            return;
        }
        res.status(200).json(singleReview);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
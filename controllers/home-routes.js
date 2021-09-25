const router = require('express').Router();
const consoleGame = require('../models/consoleGame');
const userGame = require('../models/userGame');
const { User, Game, Console, Review } = require('../models');
const withAuth = require('../utils/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', async (req, res) => {
  try {
    const consoleData = await Console.findAll({
      include: {
        model: Game,
        attributes: [
          'id',
          'title',
          'release_date',
          'rating_avg',
          'genre',
          'esrb_rating'
        ],
      }
    });

    const console = consoleData.map((data) =>
      data.get({ plain: true })
    );

    res.render('home', { console, loggedIn: req.session.loggedIn });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/search/:search', async (req, res) => {
  try {
    const searchResults = await Game.findAll({
      where: {
        title: {
          [Op.like]: `%${req.params.search}%`,
        },
      },
    });

    const results = searchResults.map((data) =>
      data.get({ plain: true })
    );

    res.render('searchResults', { results, loggedIn: req.session.loggedIn, searchParams: req.params.search });
  }
  catch (err) {
    res.status(500).json(err);
  }
})

router.get('/game/:id', async (req, res) => {

  try {
    const gameData = await Game.findByPk(req.params.id, {
      include: [{ model: Review }, { model: Console }, { model: User }],
    });


    const game = gameData.get({ plain: true });

    res.render('game', { game, loggedIn: req.session.loggedIn });

  }
  catch (err) {
    res.status(500).json(err);
  }
});



router.get('/profile', async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        include: [
          {
            model: Review,
            attributes: [
              'id',
              'review_title',
              'description',
              'num_rating',
              'helpful',
              'not_helpful',
              'creation_date',
            ],
          },
          {
            model: Game,
            attributes: [
              'id',
              'title',
              'release_date',
              'rating_avg',
              'genre',
              'esrb_rating'
            ],
          },
        ],
      });

      const user = userData.get({ plain: true });

      res.render('profile', { user, loggedIn: req.session.loggedIn });
    }
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  else {
    res.render('login');
  }
});

router.get('/reviews/:id', async (req, res) => {

  try {
    const allReviews = await Review.findAll({
      where: {
        game_id: req.params.id
      }
    });

    const review = allReviews.map((data) =>
      data.get({ plain: true })
    );

    res.render('allReviews', { review, loggedIn: req.session.loggedIn });
  }
  catch (err) {
    res.status(500).json(err);
  }
})


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login', { loggedIn: req.session.loggedIn });
});

module.exports = router;
const router = require('express').Router();
const consoleGame = require('../models/consoleGame');
const userGame = require('../models/userGame');
const { User, Game, Console, Review } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const gameData = await Game.findAll({
      include: {
        model: Console,
        attributes: [
          'id',
          'name'
        ],
      }
    });

    const game = gameData.map((data) =>
      data.get({ plain: true })
    );

    res.render('home', { game, loggedIn: req.session.loggedIn});
  } 
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/console', async (req, res) => {
  try {
    const consoleData = await Console.findAll({
      include: {
        model: Game,
        attributes: [
          'id',
          'title',
          'release_date',
          'rating_scale',
          'rating_avg',
          'genre',
          'esrb_rating',
          'description'
        ],
      }
    });

    const console = consoleData.map((data) =>
      data.get({ plain: true })
    );

    res.render('console', { console, loggedIn: req.session.loggedIn});
  } 
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


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
              'rating_scale',
              'rating_avg',
              'genre',
              'esrb_rating',
              'description'
            ],
          },
        ],
      });

      const user = userData.get({ plain: true });

      res.render('profile', { user, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  else {
  res.render('login');
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login', { loggedIn: req.session.loggedIn });
});

module.exports = router;
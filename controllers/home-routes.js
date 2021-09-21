const router = require('express').Router();
const consoleGame = require('../models/consoleGame');
const userGame = require('../models/userGame');
const { User, Game, Console, Review } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const consoleData = await Console.findAll({});

    const console = consoleData.map((data) =>
      data.get({ plain: true })
    );

    res.render('home', {
      console,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/console', (req, res) => {
  res.render('console')
});

router.get('/game', (req, res) => {
  res.render('game')
});

router.get('/game/:id', async (req, res) => {

  try {
    const gameData = await Game.findByPk(req.params.id, {
      include: [{ model: Review }, { model: Console }, { model: User }],
    });


    const game = gameData.get({ plain: true });

    res.render('game', { game });
  }
  catch (err) {
    res.status(500).json(err);
  }
});



router.get('/profile', withAuth, async (req, res) => {
  if (req.session.loggedIn) {
    try {
      const userData = await User.findByPk(req.session.user_id);

      const user = userData.get({ plain: true });

      res.render('profile', { user });
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

  res.render('login');
});


module.exports = router;
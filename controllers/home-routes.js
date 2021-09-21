const router = require('express').Router();
const consoleGame = require('../models/consoleGame');
const userGame = require('../models/userGame');
const { User, Game, Console, Review } = require('../models');


router.get('/', async (req, res) => {
  const console = await Console.findAll();

    res.render('home', { console });
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
        include: [{model: Review}, {model: Console}, {model: User}],
    });
      

      const game = gameData.get({ plain: true });
     
      res.render('game', { game });
    } 
    catch (err) {
      res.status(500).json(err);
    }
});



router.get('/profile', (req, res) => {
  if (req.session.loggedIn) {
    res.render('profile')
    return;
  }

  res.render('login');
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

  
  module.exports = router;
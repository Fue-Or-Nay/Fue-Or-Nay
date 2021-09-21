

const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('home')
});

router.get('/console', (req, res) => {
  res.render('console')
});

router.get('/game', (req, res) => {
  res.render('game')
});

router.get('/game/:id', (req, res) => {
  res.render('game')
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
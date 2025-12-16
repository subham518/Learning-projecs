const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('landing');
});


router.get('/home', (req, res) => {
  // Pass name via query param (no session)
  const userName = req.query.name || null;
  res.render('home', { name: userName || 'User' });
});


// Existing tools
router.get('/tools/factorial', (req, res) => {
  res.render('tools/factorial');
});

router.get('/tools/prime', (req, res) => {
  res.render('tools/prime');
});

router.get('/tools/arithmetic', (req, res) => {
  res.render('tools/arithmetic');
});


// New tools
router.get('/tools/lcm', (req, res) => {
  res.render('tools/lcm');
});

router.get('/tools/gcd', (req, res) => {
  res.render('tools/gcd');
});

router.get('/tools/exponent', (req, res) => {
  res.render('tools/exponent');
});

router.get('/tools/squareroot', (req, res) => {
  res.render('tools/squareroot');
});


module.exports = router;

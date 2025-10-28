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

router.get('/tools/factorial', (req, res) => {
  res.render('tools/factorial');
});
router.get('/tools/prime', (req, res) => {
  res.render('tools/prime');
});
router.get('/tools/arithmetic', (req, res) => {
  res.render('tools/arithmetic');
});

module.exports = router;

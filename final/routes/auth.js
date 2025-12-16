const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.render('register', { error: 'Email already exists.' });
    }
    await User.create({ name, email, password });
    return res.redirect('/home');
  } catch (err) {
    return res.render('register', { error: 'Registration error.' });
  }
});

router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.render('login', { error: 'Invalid credentials.' });
    }
    // Pass name via query param for Home
    return res.redirect(`/home?name=${encodeURIComponent(user.name)}`);
  } catch (err) {
    return res.render('login', { error: 'Login error.' });
  }
});

router.get('/logout', (req, res) => {
  // If using sessions, you could add req.session.destroy()
  res.redirect('/login');
});

module.exports = router;

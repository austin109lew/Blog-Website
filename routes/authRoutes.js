const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Sign up route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });
    req.session.user = newUser;
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }
    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;

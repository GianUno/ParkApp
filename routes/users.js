const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
require('dotenv').config();

// Registrar novo usuário
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ msg: 'Usuário já existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ msg: 'Usuário registrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao registrar usuário', error: err.message });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let JWT_SECRET = process.env.JWT_SECRET;

  try {
    const user = await User.findOne({ username });
    console.log(username);
    if (!user) return res.status(400).json({ msg: 'Credenciais inválidas, user' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciais inválidas, password' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, msg: 'Login bem-sucedido!' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao autenticar', error: err.message });
  }
});

module.exports = router;

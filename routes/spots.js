const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const stringCapitalizeName = require('string-capitalize-name');

const Spot = require('../models/spot');

router.get('/:id', (req, res) => {
  Spot.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `Vaga não encontrada.`});
    });
});


router.get('/', (req, res) => {
  Spot.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Algo deu errado. ${err}` });
    });
});


router.post('/', postLimiter, (req, res) => {
  
})
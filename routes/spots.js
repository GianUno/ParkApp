const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const stringCapitalizeName = require('string-capitalize-name');

const Spot = require('../models/spot');

const minutes = 5;
const postLimiter = rateLimit({
  windowsMs: minutes * 60 * 1000,
  max: 100,
  delayMs: 0,
  handler: (req, res) => {
    res.status(429).json({ success: false, msg: `Muitas requisições ao mesmo tempo. Tente novamente após ${minutes} minutos.`})
  }
})

// READ ONE
router.get('/:id', (req, res) => {
  Spot.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `Vaga não encontrada.`});
    });
});

// READ ALL
router.get('/', (req, res) => {
  Spot.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Algo deu errado. ${err}` });
    });
});

// CREATE
router.post('/', postLimiter, (req, res) => {
  
  let newSpot = new Spot({
    name: sanitizeName(req.body.name),
    plate: sanitizePlate(req.body.plate),
    model: sanitizeModel(req.body.model),
    color: sanitizeColor(req.body.color),
    cost: sanitizeCost(req.body.cost),
  });

  newSpot.save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Adicionado com sucesso!`,
        result: {
          _id: result._id,
          name: result.name,
          plate: result.plate,
          model: result.model,
          color: result.color,
          cost: result.cost
        }
      });
    })
    .catch((err) => {
      if (err.errors) {
      if (err.errors.name) {
        res.status(400).json({ success: false, msg: err.errors.name.message });
        return;
      }
      if (err.errors.plate) {
        res.status(400).json({ success: false, msg: err.errors.plate.message });
        return;
      }
      if (err.errors.model) {
        res.status(400).json({ success: false, msg: err.errors.model.message });
        return;
      }
      if (err.errors.color) {
        res.status(400).json({ success: false, msg: err.errors.color.message });
        return;
      }
      if (err.errors.cost) {
        res.status(400).json({ success: false, msg: err.errors.cost.message });
        return;
      }

      res.status(500).json({ success: false, msg: `Algo deu errado. ${err}`});
    }
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  let updatedSpot = {
    name: sanitizeName(req.body.name),
    plate: sanitizePlate(req.body.plate),
    model: sanitizeModel(req.body.model),
    color: sanitizeColor(req.body.color),
    cost: sanitizeCost(req.body.cost)
  };

  Spot.findOneAndUpdate({ _id: req.params.id }, updatedSpot, { runValidators: true, context: 'query' })
    .then((oldResult) => {
      Spot.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Atualizado com sucesso!`,
            result: {
              _id: newResult._id,
              name: newResult.name,
              plate: newResult.plate,
              model: newResult.model,
              color: newResult.color,
              cost: newResult.cost
            }
          });
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: `Algo deu errado. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
      if (err.errors.name) {
        res.status(400).json({ success: false, msg: err.errors.name.message });
        return;
      }
      if (err.errors.plate) {
        res.status(400).json({ success: false, msg: err.errors.plate.message });
        return;
      }
      if (err.errors.model) {
        res.status(400).json({ success: false, msg: err.errors.model.message });
        return;
      }
      if (err.errors.color) {
        res.status(400).json({ success: false, msg: err.errors.color.message });
        return;
      }
      if (err.errors.cost) {
        res.status(400).json({ success: false, msg: err.errors.cost.message });
        return;
      }
      res.status(500).json({ success: false, msg: `Algo deu errado. ${err}` });
    }
  });
});
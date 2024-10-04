const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

// name, plate, model, color.
const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Nome não pode passar de {ARGS[1]}.'
  })
];

const plateValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 4],
    message: 'Tamanho da placa inválido.'
  }),
];

const modelValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 20],
    message: 'Modelo não pode passar de {ARGS[1]}.'
  }),
];

const colorValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 15],
    message: 'Cor não pode passar de {ARGS[1]}.'
  })
];

const costValidator = [
  validate({
    validator: Number.isInteger,
    message: 'Valor não é válido.'
  })
];


const SpotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório.'],
    validate: nameValidator
  },
  plate: {
    type: String,
    required: [true, 'Placa é obrigatório.'],
    unique: true,
    validate: plateValidator
  },
  model: {
    type: String,
    required: [true, 'Modelo é obrigatório.'],
    validate: modelValidator
  },
  color: {
    type: String,
    validate: colorValidator
  },
  cost: {
    type: Number,
    required: [true, 'Valor é obrigatório.'],
    validade: costValidator
  }
});

SpotSchema.plugin(unique, { message: 'Carro já cadastrado.' });

const Spot = module.exports = mongoose.model('spot', SpotSchema);

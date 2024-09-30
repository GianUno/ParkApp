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
    validator: '',
    arguments: [,],
    message: ''
  }),
];
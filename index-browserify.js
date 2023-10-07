const ChangeTypes = require('./lib/ChangeTypes');
const factor = require('./lib/factor');
const simplifyExpression = require('./lib/simplifyExpression');
const solveEquation = require('./lib/solveEquation');
const printNode = require('./lib/util/print');
const math = require('mathjs');

module.exports = {
  factor,
  simplifyExpression,
  solveEquation,
  ChangeTypes,
  printNode,
  math,
};

window.mathsteps = module.exports;

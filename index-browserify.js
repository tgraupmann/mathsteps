const ChangeTypes = require('./lib/ChangeTypes');
const factor = require('./lib/factor');
const simplifyExpression = require('./lib/simplifyExpression');
const solveEquation = require('./lib/solveEquation');
const printNode = require('./lib/util/print');

module.exports = {
  factor,
  simplifyExpression,
  solveEquation,
  ChangeTypes,
  printNode,
};

window.mathsteps = module.exports;

## A step by step solver for math

[![Join the chat at https://gitter.im/mathsteps-chat/Lobby](https://badges.gitter.im/mathsteps-chat/Lobby.svg)](https://gitter.im/mathsteps-chat/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Fork

* This repository has been forked from Google's mathsteps project and extended with capabilities to support simplification, sorting polynomials, fraction operations, and sin/cos/abs/sqrt/pi symbols. [dist/Mathsteps.js](dist/Mathsteps.js) has been exported through browserify to make the library available in the browser. Parsing and simplification has been added through vue [dist/components.js](dist/components.js). Check out the [Web Demo](https://tgraupmann.github.io/mathsteps/algebra.html)[algebra.html].

## Requirements

Mathsteps requires Node version > 6.0.0

## Dependencies

* Install dependencies

```sh
npm install
```

* Expose mathsteps.js for the browser with [Browserify](https://browserify.org/)

```sh
# Install globally
npm install -g browserify
```

Export mathsteps for the browser.

```sh
mkdir dist
browserify index-browserify.js -o dist/mathsteps.js
```

## Usage

To install mathsteps using npm:

    npm install mathsteps

```js
const mathsteps = require('mathsteps');

const steps = mathsteps.simplifyExpression('2x + 2x + x + x');

steps.forEach(step => {
	console.log("before change: " + step.oldNode.toString());   // before change: 2 x + 2 x + x + x
	console.log("change: " + step.changeType);                  // change: ADD_POLYNOMIAL_TERMS
	console.log("after change: " + step.newNode.toString());    // after change: 6 x
	console.log("# of substeps: " + step.substeps.length);      // # of substeps: 3
});
```

To solve an equation:
```js
const steps = mathsteps.solveEquation('2x + 3x = 35');

steps.forEach(step => {
    console.log("before change: " + step.oldEquation.ascii());  // e.g. before change: 2x + 3x = 35
    console.log("change: " + step.changeType);                  // e.g. change: SIMPLIFY_LEFT_SIDE
    console.log("after change: " + step.newEquation.ascii());   // e.g. after change: 5x = 35
    console.log("# of substeps: " + step.substeps.length);      // e.g. # of substeps: 2
});
```

(if you're using mathsteps v0.1.6 or lower, use `.print()` instead of `.ascii()`)

To see all the change types:
```js
const changes = mathsteps.ChangeTypes;
```



## Contributing

Hi! If you're interested in working on this, that would be super awesome!
Learn more here: [CONTRIBUTING.md](CONTRIBUTING.md).

## Build

First clone the project from github:

    git clone https://github.com/google/mathsteps.git
    cd mathsteps

Install the project dependencies:

    npm install

## Test

To execute tests for the library, install the project dependencies once:

    npm install

Then, the tests can be executed:

    npm test

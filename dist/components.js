Vue.component("vue-mathsteps-parse", {
  props: ["expression"],
  methods: {
    toTex(expression) {
      try {
        const node = mathsteps.math.parse(expression);
        return node.toTex();
      } catch (err) {
        return expression;
      }
    },
  },
  template: `
  <div :title="expression">{{ '$$' + toTex(expression) + '$$' }}</div>
  `,
});

Vue.component("vue-mathsteps-parse-substition", {
  props: ["expression", "letter", "value"],
  methods: {
    substitute(expression) {
      return expression.replaceAll(this.letter, '(' + this.value + ')');
    },
  },
  template: `
  <vue-mathsteps-parse :expression="substitute(expression)"></vue-mathsteps-parse>
  `,
});

Vue.component("vue-mathsteps-simplify", {
  props: ["expression"],
  methods: {
    simplify(expression) {
      const steps = mathsteps.simplifyExpression(expression);
      if (steps.length > 0) {
        return steps[steps.length - 1].newNode.toString();
      }
      return expression;
    },
  },
  template: `
  <vue-mathsteps-parse :expression="simplify(expression)"></vue-mathsteps-parse>
  `,
});

Vue.component("vue-mathsteps-simplify-substition", {
  props: ["expression", "letter", "value"],
  methods: {
    substitute(expression) {
      return expression.replaceAll(this.letter, '(' + this.value + ')');
    },
  },
  template: `
  <vue-mathsteps-simplify :expression="substitute(expression)"></vue-mathsteps-simplify>
  `,
});

Vue.component("vue-mathsteps-fraction", {
  props: ["decimal"],
  methods: {
    getFactors(number) {
      let factors = [];
      let i = 2;
      do {
        if (number % i == 0) {
          factors.push(i);
          number /= i;
          continue;
        }
        ++i;
      } while (i <= number);
      if (factors.length == 0) {
        factors.push(1);
      }
      return factors;
    },

    removeFactor(list, item) {
      let index = list.indexOf(item);
      if (index >= 0) {
        list = list.splice(index, 1);
      }
      return list;
    },

    reduceFactors(a, b) {
      let resultA = [...a];
      let resultB = [...b];
      for (let i = 0; i < a.length; ++i) {
        let af = a[i];
        //console.log('search=', af);
        if (resultA.includes(af) && resultB.includes(af)) {
          //console.log('remove=', af);
          this.removeFactor(resultA, af);
          this.removeFactor(resultB, af);
        }
      }
      //console.log('resultA=', resultA, "resultB=", resultB);
      if (resultA.length == 0) {
        resultA.push(1);
      }
      if (resultB.length == 0) {
        resultB.push(1);
      }
      return {
        numerator: resultA,
        denominator: resultB,
      }
    },

    combineFactors(reduction) {
      let numerator = 1;
      let denominator = 1;
      for (let i = 0; i < reduction.numerator.length; ++i) {
        numerator *= reduction.numerator[i];
      }
      for (let i = 0; i < reduction.denominator.length; ++i) {
        denominator *= reduction.denominator[i];
      }
      return {
        numerator: numerator,
        denominator: denominator,
      };
    },

    convertToFraction(decimal) {
      //console.log('convertToFraction: decimal=', decimal, 'Number=', asNumber, Number.isNaN(asNumber));
      let asNumber = Number(decimal);
      if (Number.isNaN(asNumber)) {
        return decimal;
      }
      let isNegative = asNumber < 0;
      asNumber = Math.abs(asNumber);
      let index = decimal.toString().indexOf('.');
      if (index < 0) {
        return decimal;
      }
      let whole = asNumber.toString().substring(0, index - 1);
      let fraction = asNumber.toString().substring(index + 1);
      const MAX_DENOM_LENGTH = 6;
      if (fraction.length > MAX_DENOM_LENGTH) {
        fraction = fraction.substring(0, MAX_DENOM_LENGTH);
      }
      let denominator = Math.pow(10, fraction.length);
      let numerator = Number(fraction);
      //console.log('asNumber', asNumber, 'whole=', whole, 'fraction=', fraction, 'numerator', numerator, 'denominator=', denominator);
      //console.log('factors numerator=', this.getFactors(numerator));
      //console.log('factors denominator=', this.getFactors(denominator));
      let reduction = this.reduceFactors(this.getFactors(numerator), this.getFactors(denominator));
      //console.log('reduction=', reduction);
      //console.log('factors numerator=', reduction.numerator);
      //console.log('factors denominator=', reduction.denominator);
      let factors = this.combineFactors(reduction);
      //console.log('factors=', factors);
      let result = '';
      if (isNegative) {
        result = '-';
      }
      if (whole != 0) {
        if (isNegative) {
          result += whole + ' - ';
        } else {
          result += whole + ' + ';
        }
      }
      result += factors.numerator;
      if (factors.denominator != "1") {
        result += ' / ' + factors.denominator;
      }
      //console.log('result=', result);
      return result;
    },
  },
  template: `
    <vue-mathsteps-parse :expression="convertToFraction(decimal)"></vue-mathsteps-parse>
  `,
});

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

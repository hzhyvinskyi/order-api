module.exports = function(config) {
  config.set({
    testRunner: "mocha",
    mochaOptions: {
      files: ["test/**/*.spec.ts"],
      opts: './test/mocha.opts',
      ui: "tdd",
      timeout: 35000,
      require: ["ts-node/register", "source-map-support/register"],
      asyncOnly: false
    },
    mutator: "typescript",
    packageManager: "npm",
    reporters: ["html", "progress", "dashboard"],
    transpilers: ["typescript"],
    testFramework: "mocha",
    coverageAnalysis: "off",
    tsconfigFile: "tsconfig.json",
    mutate: ["src/**/*.ts"]
  });
};

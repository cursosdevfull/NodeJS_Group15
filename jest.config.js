module.exports = {
  testEnvironment: "node",
  bail: true,
  verbose: true,
  setupFilesAfterEnv: ["jest-extended"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "reports",
        filename: "test.v2.html",
      },
    ],
    [
      "./node_modules/jest-html-reporter",
      {
        pageTitle: "Test API",
        outputPath: "reports/test.v1.html",
      },
    ],
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.entity.ts",
    "!**/node_modules/**",
  ],
  coverageReporters: ["json", "text", "html", "lcov"],
  coverageDirectory: "reports/coverage",
  testPathIgnorePatterns: ["/node_modules/"],
  testMatch: ["<rootDir>/test/**/*.spec.ts"],
  testResultsProcessor: "jest-sonar-reporter",
  preset: "ts-jest",
};

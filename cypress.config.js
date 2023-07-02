const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 5000,
  video: false,
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,
  retries: 0,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    setupNodeEvents(on, config) {
      if (config.env.prod) {
        return {
          baseUrl: "https://demoqa.com",
          env: {
            env: "prod",
            apiUrl: "https://demoqa.com",
            apiGenerateToken: "/Account/v1/GenerateToken",
            apiLogin: "/Account/v1/Login",
            apiAuthorized: "/Account/v1/Authorized",
            apiUser: "/Account/v1/User",
            login: "/login",
            profile: "/profile",
            books: "/books"
          },
        };
      } else
      return {
        //Change these values with values from another environment
        baseUrl: "https://demoqa.com",
        env: {
          env: "staging",
          apiUrl: "https://demoqa.com",
          apiGenerateToken: "/Account/v1/GenerateToken",
          apiLogin: "/Account/v1/Login",
          apiAuthorized: "/Account/v1/Authorized",
          apiUser: "/Account/v1/User",
          login: "/login",
          profile: "/profile",
          books: "/books"
        },
      };
    },
  },
});

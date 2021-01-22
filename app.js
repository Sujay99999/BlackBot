//The file containing all the middleware and handling the requests globally.

//Internal modules

//npm modules
const morgan = require("morgan");
const express = require("express");

const app = express();

//Error logging middleware
if (process.env.NODE_ENV === "development") {
  console.log("development");
  app.use(morgan("dev"));
}

//Serving the static files
app.use(express.static(`${__dirname}/public`));

//custom middleware
app.use((req, res, next) => {
  console.log("Hello from the middlware");
  next();
});

module.exports = app;

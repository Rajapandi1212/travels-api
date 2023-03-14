const morgan = require("morgan");
const Logger = require("../utils/Logger");

const stream = {
  write: (message) => Logger.http(message),
};

const skip = (req, res) => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development" || res.statusCode === 400;
};
const requestMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);

module.exports = requestMiddleware;
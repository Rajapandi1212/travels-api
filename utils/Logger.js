const { createLogger, transports, format, addColors } = require("winston");
const { combine, timestamp, label, printf, prettyPrint, colorize } = format;
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};
const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};
addColors(colors);
const colorizer = colorize();
const defaultFormatter = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  prettyPrint(
    (info) => `${info.level.toUpperCase()} ${info.timestamp}  ${info.message}`
  )
);
const allTransports = [
  new transports.Console({
    format: combine(
      timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
      printf((info) =>
        colorizer.colorize(
          `${info.level}`,
          `${info.level.toUpperCase()} ${info.timestamp} : ${info.message}`
        )
      )
    ),
  }),
  new transports.File({
    filename: "logs/error.log",
    level: "error",
    format: defaultFormatter,
  }),
  new transports.File({
    filename: "logs/all.log",
    format: defaultFormatter,
  }),
];

const Logger = createLogger({
  level: level(),
  levels,
  format: combine(
    label({ label: "CUSTOM LOGGER" }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: allTransports,
});

module.exports = Logger;
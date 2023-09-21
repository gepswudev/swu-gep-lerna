const fs = require("fs");
const path = require("path");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const logDir = "log/database";

// Define custom log levels for update and delete actions
const customLevels = {
  levels: {
    error: 0,
    info: 1,
    update: 2,
    delete: 3,
  },
  colors: {
    error: "red",
    info: "green",
    update: "yellow",
    delete: "blue",
  },
};

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  levels: customLevels.levels,
  format: combine(label({ label: "DB Action!" }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: logDir+"/error.log", level: "error" }),
    new transports.File({ filename: logDir+"/delete.log", level: "delete" }),
    new transports.File({ filename: logDir+"/update.log", level: "update" }),
    new transports.File({ filename: logDir+"/info.log" }),
  ],
});

// Add log functions for each action
const log = {
  info: (message) => logger.log({ level: "info", message }),
  update: (message) => logger.log({ level: "update", message }),
  delete: (message) => logger.log({ level: "delete", message }),
  error: (message) => logger.log({ level: "error", message }),
};

module.exports = log;

const { compare } = require("bcryptjs");
const { handleHttpError } = require("./handleError");
const { tokenSign, verifyToken } = require("./handleJwt");
const { loggerStream } = require("./handleLogger");
const { encrypt } = require("./handlePassword");
const { getProperties } = require("./handlePropertiesEngine");
const uploadMiddleware = require("./handleStorage");
const { validateResults } = require("./handleValidator");

module.exports = {
  uploadMiddleware,
  handleHttpError,
  tokenSign,
  verifyToken,
  encrypt,
  validateResults,
  compare,
  loggerStream,
  getProperties,
};

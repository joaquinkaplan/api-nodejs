const { compare } = require("bcryptjs");
const { handleHttpError } = require("./handleError");
const { tokenSign, verifyToken } = require("./handleJwt");
const { encrypt } = require("./handlePassword");
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
};

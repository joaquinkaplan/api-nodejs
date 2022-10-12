const customHeader = require("./customHeader");
const { checkRole } = require("./role");
const authMiddleware = require("./session");

module.exports = { customHeader, authMiddleware, checkRole };

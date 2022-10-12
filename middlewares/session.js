const { handleHttpError, verifyToken } = require("../utils");
const { usersModel } = require("../models");

const authMiddleware = async (req, res, next) => {
  let bearer = req.headers.authorization;
  try {
    if (!bearer) {
      handleHttpError(res, "NEED_SESSION", 401);
      return;
    }

    const token = bearer.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken) {
      handleHttpError(res, "NO_TOKEN", 401);
      return;
    }

    const user = await usersModel.findById(dataToken._id);
    req.user = user;

    next();
  } catch (e) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = authMiddleware;

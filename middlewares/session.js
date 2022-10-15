const { handleHttpError, verifyToken } = require("../utils");
const { usersModel } = require("../models");
const { getProperties } = require("../utils");
const propertiesKey = getProperties();

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

    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id],
    };

    const user = await usersModel.findOne(query);
    req.user = user;

    next();
  } catch (e) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = authMiddleware;

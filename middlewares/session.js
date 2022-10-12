const { handleHttpError, verifyToken } = require("../utils");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NEED_SESSION", 401);
      return;
    }

    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token);

    if (!dataToken) {
      handleHttpError(res, "NO_TOKEN", 401);
      return;
    }

    next();
  } catch (e) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};

module.exports = authMiddleware;

const { handleHttpError } = require("../utils");

const checkRole = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role;
    const checkValueRole = roles.some((roleSingle) =>
      rolesByUser.includes(roleSingle)
    );

    if (!checkValueRole) {
      handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
      return;
    }
    next();
  } catch (e) {
    handleHttpError(res, "ERROR_PERMISSION_NOT_ALLOWED", 403);
  }
};

module.exports = { checkRole };

const { validatorRegister, validatorLogin } = require("./auth");
const { validatorGetItem, validatorCreateItem } = require("./tracks");

module.exports = {
  validatorRegister,
  validatorLogin,
  validatorGetItem,
  validatorCreateItem,
};

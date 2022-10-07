const { matchedData } = require("express-validator");
const { encrypt } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { usersModel } = require("../models");

const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const passwordHash = await encrypt(req.password);
    const body = { ...req, password: passwordHash };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = { token: await tokenSign(dataUser), user: dataUser };

    res.send({ data });
  } catch (e) {
    res.status(400).send({ error: e });
  }
};

module.exports = { registerCtrl };

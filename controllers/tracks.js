const { tracksModel } = require("../models");

const getItems = async (req, res) => {
  const data = await tracksModel.find({});

  if (data !== undefined) {
    res.send({ data });
  } else {
    res.send({ response: "no data available" });
  }
};
const getItem = (req, res) => {};
const createItem = async (req, res) => {
  const { body } = req;
  const data = await tracksModel.create(body);
  res.send({ data });
};
const updateItem = (req, res) => {};
const deleteItem = (req, res) => {};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };

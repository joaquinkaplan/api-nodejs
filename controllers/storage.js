const fs = require("fs");
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    const { filename } = data;
    console.log(filename);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createItem = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_ITEM");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataFile = await storageModel.findById(id);
    const deleteResponse = await storageModel.delete({ _id: id });
    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`;
    // fs.unlinkSync(filePath);
    const data = {
      filePath,
      deleted: deleteResponse.matchedCount,
    };

    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_ITEMS");
  }
};

module.exports = { getItems, getItem, createItem, deleteItem };

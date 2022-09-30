const express = require("express");
const { getItems, getItem, createItem } = require("../controllers/tracks");
const { validatorCreateItem } = require("../validators/tracks");
const customHeader = require("../middlewares/customHeader");
const router = express.Router();

router.get("/", getItems);
router.post("/", validatorCreateItem, customHeader, createItem);

module.exports = router;

const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/tracks");
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/tracks");
const { authMiddleware, checkRole } = require("../middlewares");
const router = express.Router();

router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, validatorGetItem, getItem);
router.post(
  "/",
  authMiddleware,
  checkRole(["admin"]),
  validatorCreateItem,
  createItem
);
router.put(
  "/:id",
  authMiddleware,
  validatorCreateItem,
  validatorGetItem,
  updateItem
);
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;

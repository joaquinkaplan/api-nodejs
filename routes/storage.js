const express = require("express");
const {
  createItem,
  getItems,
  getItem,
  deleteItem,
} = require("../controllers/storage");
const router = express.Router();
const { uploadMiddleware } = require("../utils");
const { authMiddleware } = require("../middlewares");
const { validatorGetItem } = require("../validators");

/**
 * Get all storages
 * @openapi
 * /storage:
 *    get:
 *      tags:
 *        - storage
 *      summary: "get all items"
 *      description: obtain list of all items
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: returns list of all items.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/storage'
 *        '422':
 *          description: validation error.
 */
router.get("/", getItems);
/**
 * Get detail from storage
 * @openapi
 * /storage/{id}:
 *    get:
 *      tags:
 *        - storage
 *      summary: "get specific item"
 *      description: obtain item in detail
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: returns object from storage
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/storage'
 *        '422':
 *          description: validation error.
 */
router.get("/:id", validatorGetItem, getItem);
/**
 * Delete storage
 * @openapi
 * /storage/{id}:
 *    delete:
 *      tags:
 *        - storage
 *      summary: "delete item"
 *      description: delete item from storage
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: returns object from storage.
 *        '422':
 *          description: validation error.
 */
router.delete("/:id", validatorGetItem, deleteItem);
/**
 * Upload file
 * @openapi
 * /storage:
 *    post:
 *      tags:
 *        - storage
 *      summary: "Upload file"
 *      description: upload file
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: returns object from collection
 *        '422':
 *          description: validation error
 *      requestBody:
 *        content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               myfile:
 *                 type: string
 *                 format: binary
 *    responses:
 *      '201':
 *        description: returns object from collection
 *      '403':
 *        description: validation error
 */
router.post("/", uploadMiddleware.single("myfile"), createItem);

module.exports = router;

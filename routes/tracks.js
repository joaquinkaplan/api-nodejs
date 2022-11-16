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
const ENGINE_DB = process.env.ENGINE_DB;

/**
 * Get all tracks
 * @openapi
 * /tracks:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "list songs"
 *      description: obtain all songs
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: returns list of songs.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/track'
 *        '422':
 *          description: validation error.
 */
router.get("/", getItems);
/**
 * Get track
 * @openapi
 * /tracks/{id}:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "detail of song"
 *      description: Obtain song info in detail
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
 *          description: return object of song
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/track'
 *        '422':
 *          description: validation error
 */
router.get("/:id", validatorGetItem, getItem);
/**
 * Register new track
 * @openapi
 * /tracks:
 *    post:
 *      tags:
 *        - tracks
 *      summary: "Register track"
 *      description: register one song and obtain its detail
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Returns object from collection.
 *        '422':
 *          description: validation error.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/track"
 *    responses:
 *      '201':
 *        description: Returns object from collection
 *      '403':
 *        description: validation error
 */
router.post(
  "/",
  authMiddleware,
  checkRole(["user", "admin"]),
  validatorCreateItem,
  createItem
);
/**
 * Update track
 * @openapi
 * /tracks/{id}:
 *    put:
 *      tags:
 *        - tracks
 *      summary: "Update track"
 *      description: update song and obtain its detail
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
 *          description: returns object updated from collection.
 *        '422':
 *          description: validation error.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/track"
 *    responses:
 *      '201':
 *        description: returns object from collection
 *        content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/track'
 *      '403':
 *        description: validation error
 */
router.put(
  "/:id",
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateItem
);
/**
 * Delete track
 * @openapi
 * /tracks/{id}:
 *    delete:
 *      tags:
 *        - tracks
 *      summary: "delete song"
 *      description: delete one track
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
 *          description: returns song object
 *        '422':
 *          description: validation error.
 */
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);
module.exports = router;

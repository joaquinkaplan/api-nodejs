const express = require("express");
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { registerCtrl, loginCtrl } = require("../controllers/auth");
const router = express.Router();

/**
 * http://localhost:3001/api
 *
 * Route register new user
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Register new user"
 *          description: ""
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/authRegister"
 *          responses:
 *                  '201':
 *                      description: user registered correctly
 *                  '403':
 *                      description: validation error
 */
router.post("/register", validatorRegister, registerCtrl);
/**
 * Login user
 * @openapi
 * /auth/login:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Login user"
 *      description: login existing user and get token
 *      responses:
 *        '200':
 *          description: returns object from collection
 *        '422':
 *          description: validation error.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/authLogin"
 *    responses:
 *      '201':
 *        description: returns object from collection
 *      '403':
 *        description: validation error.
 */
router.post("/login", validatorLogin, loginCtrl);

module.exports = router;

// actions.js
const Actions = require('../models/actions')
  , _ = require('lodash')
  , writeResponse = require('../helpers/response').writeResponse
  , writeError = require('../helpers/response').writeError
  , loginRequired = require('../middlewares/loginRequired')
  , dbUtils = require('../neo4j/dbUtils');

/**
 * @swagger
 * definition:
 *   Action:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       description:
 *         type: string
 *       summary:
 *         type: object
 */

/**
 * @swagger
 * /api/v0/actions:
 *   get:
 *     tags:
 *     - actions
 *     description: Find all actions
 *     summary: Find all actions
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of actions
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Action'
 */
exports.list = function (req, res, next) {
  Actions.getAll(dbUtils.getSession(req))
    .then(response => writeResponse(res, response))
    .catch(next);
};

/**
 * @swagger
 * /api/v0/actions/{id}:
 *   get:
 *     tags:
 *     - actions
 *     description: Find action by ID
 *     summary: Find action by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: action id
 *         in: path
 *         required: true
 *         type: string
 *       - name: Authorization
 *         in: header
 *         type: string
 *         description: Token (token goes here)
 *     responses:
 *       200:
 *         description: A action
 *         schema:
 *           $ref: '#/definitions/Action'
 *       404:
 *         description: action not found
 */
exports.findById = function (req, res, next) {
  Actions.getById(dbUtils.getSession(req), req.params.id, req.user.id)
    .then(response => writeResponse(res, response))
    .catch(next);
};

/**
 * @swagger
 * /api/v0/actions/daterange/{start}/{end}:
 *   get:
 *     tags:
 *     - actions
 *     description: Returns actions between a year range
 *     summary: Returns actions between a year range
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: start
 *         description: Year that the action was released on or after
 *         in: path
 *         required: true
 *         type: integer
 *       - name: end
 *         description: Year that the action was released before
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A list of actions
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Action'
 *       400:
 *         description: Error message(s)
 */
exports.findActionsByDateRange = function (req, res, next) {
  const start = req.params.start;
  const end = req.params.end;
  if (!start) throw {message: 'Invalid start', status: 400};
  if (!end) throw {message: 'Invalid end', status: 400};
  Actions.getByDateRange(dbUtils.getSession(req), start, end)
    .then(response => writeResponse(res, response))
    .catch(next);
};

/**
 * @swagger
 * /api/v0/actions/{id}/state:
 *   post:
 *     tags:
 *     - actions
 *     description: Set the properties of a Action node
 *     summary: Set the properties of a Action node
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the action
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *             state:
 *               type: object
 *       - name: Authorization
 *         in: header
 *         type: string
 *         required: true
 *         description: Token (token goes here)
 *     responses:
 *       200:
 *         description: action properties saved
 *       400:
 *         description: Error message(s)
 *       401:
 *         description: invalid / missing authentication
 */
 exports.setActionState = function (req, res, next) {
  loginRequired(req, res, () => {
    const {state} = req.body ;
    Actions.setActionState(dbUtils.getSession(req), req.params.id, state)
      .then(response => writeResponse(res, {}))
      .catch(next);
  });
};

/**
 * @swagger
 * /api/v0/actions/state:
 *   post:
 *     tags:
 *     - actions
 *     description: Create an Action node
 *     summary: Create an Action node
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: state
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *             state:
 *               type: object
 *       - name: Authorization
 *         in: header
 *         type: string
 *         required: true
 *         description: Token (token goes here)
 *     responses:
 *       200:
 *         description: action properties saved
 *       400:
 *         description: Error message(s)
 *       401:
 *         description: invalid / missing authentication
 */
 exports.createNewAction = function (req, res, next) {
  loginRequired(req, res, () => {
    const {state} = req.body ;
    Actions.createNewAction(dbUtils.getSession(req), req.user.id, state)
      .then(response => writeResponse(res, {}))
      .catch(next);
  });
};

/**
 * @swagger
 * /api/v0/actions/{id}:
 *   get:
 *     tags:
 *     - actions
 *     description: Delete action by ID
 *     summary: Delete action by ID
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: action id
 *         in: path
 *         required: true
 *         type: string
 *       - name: Authorization
 *         in: header
 *         type: string
 *         description: Token (token goes here)
 *     responses:
 *       200:
 *         description: A action
 *         schema:
 *           $ref: '#/definitions/Action'
 *       404:
 *         description: action not found
 */
 exports.deleteById = function (req, res, next) {
  Actions.deleteById(dbUtils.getSession(req), req.params.id, req.user.id)
    .then(response => writeResponse(res, response))
    .catch(next);
};
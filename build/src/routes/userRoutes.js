"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const authUser_1 = require("../middleware/authUser");
const router = express_1.default.Router();
/**
 * @openapi
 * /healthcheck:
 *   get:
 *     tags:
 *       - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: Server is up and running
 */
router.get("/healthcheck", (req, res) => {
    res.sendStatus(200);
});
/**
 * @openapi
 * /api/users/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongpassword123
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input
 */
router.post('/register', userController_1.createUser);
/**
 * @openapi
 * /api/users/login:
 *   post:
 *     tags:
 *       - User
 *     summary: login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       400:
 *         description: Invalid email or password
 *       404:
 *         description: User not found
 */
router.post('/login', userController_1.loginUser);
/**
 * @openapi
 * /api/users/logout:
 *   post:
 *     tags:
 *       - User
 *     summary: Logout a user
 *     responses:
 *       200:
 *         description: User successfully logged out
 *       401:
 *         description: Unauthorized, user not logged in
 */
router.post('/logout', authUser_1.authUser, userController_1.logoutUser);
/**
* @openapi
* /api/users/profile:
*   get:
*     tags:
*       - User
*     summary: Get user profile
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: User fetched successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 firstName:
*                   type: string
*                   example: John
*                 lastName:
*                   type: string
*                   example: Doe
*                 email:
*                   type: string
*                   example: john.doe@example.com
*       401:
*         description: Unauthorized, login to access profile
*       404:
*         description: User not found
*/
router.get('/profile', authUser_1.authUser, userController_1.getUserProfile);
exports.default = router;

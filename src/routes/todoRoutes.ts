import express from 'express';
import { createTask, viewAllTasks, updateTask, deleteTask } from '../controller/todoController';
import { authUser } from '../middleware/authUser';

const router = express.Router();

/**
 * @openapi
 * /api/todo/tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Create a new task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - task
 *               - start
 *               - stop
 *             properties:
 *               task:
 *                 type: string
 *                 example: Complete project documentation
 *               start:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-12-01T09:00:00Z
 *               stop:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-12-01T17:00:00Z
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task created successfully
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     task:
 *                       type: string
 *                     start:
 *                       type: string
 *                     stop:
 *                       type: string
 *                     user:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: All fields are required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post('/tasks', authUser, createTask);

/**
 * @openapi
 * /api/todo/tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get all tasks for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       task:
 *                         type: string
 *                       start:
 *                         type: string
 *                       stop:
 *                         type: string
 *                       user:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No tasks found for this user
 *       500:
 *         description: Internal server error
 */

router.get('/tasks', authUser, viewAllTasks);

/**
 * @openapi
 * /api/todo/tasks/{id}:
 *   put:
 *     tags:
 *       - Tasks
 *     summary: Update a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *                 example: Update project timeline
 *               start:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-12-02T10:00:00Z
 *               stop:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-12-02T18:00:00Z
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task updated successfully
 *                 task:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     task:
 *                       type: string
 *                     start:
 *                       type: string
 *                     stop:
 *                       type: string
 *                     user:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       400:
 *         description: All fields are required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Task not found or not authorized to update
 *       500:
 *         description: Internal server error
 */

router.put('/tasks/:id', authUser, updateTask);

/**
 * @openapi
 * /api/todo/tasks/{id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Delete a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully
 *       401:
 *         description: Unauthorized - Token-related errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid token
 *                 error:
 *                   type: string
 *                   example: Token verification failed
 *       404:
 *         description: Task not found or not authorized to delete
 *       500:
 *         description: Internal server error
 */

router.delete('/tasks/:id', authUser, deleteTask);

export default router;

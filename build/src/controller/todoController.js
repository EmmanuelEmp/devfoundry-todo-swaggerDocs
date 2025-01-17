"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.viewAllTasks = exports.createTask = void 0;
const todoModel_1 = require("../model/todoModel"); // Adjust the path as necessary
// @desc Create new task
// @route POST /task
// @access private
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { task, start, stop } = req.body;
        // Get the user ID from the authenticated request
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        // Validate required fields
        if (!task || !start || !stop) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        // Create a new task
        const newTask = yield todoModel_1.Todo.create({
            task,
            start,
            stop,
            user: userId, // Associate the task with the authenticated user
        });
        res.status(201).json({
            message: 'Task created successfully',
            task: newTask,
        });
        return;
    }
    catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});
exports.createTask = createTask;
// @desc View all task
// @route GET /task
// @access private
const viewAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Assuming `req.user` contains the authenticated user's details
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        // Fetch tasks belonging to the authenticated user
        const tasks = yield todoModel_1.Todo.find({ user: userId });
        if (!tasks.length) {
            res.status(404).json({ message: 'No tasks found for this user' });
            return;
        }
        res.status(200).json({ tasks });
        return;
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});
exports.viewAllTasks = viewAllTasks;
// @desc update task
// @route PUT /task
// @access private
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params; // Get task ID from route params
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { task, start, stop } = req.body;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        // Find and update the task if it belongs to the authenticated user
        const updatedTask = yield todoModel_1.Todo.findOneAndUpdate({ _id: id, user: userId }, // Match both task ID and user ID
        { task, start, stop, updatedAt: new Date() }, { new: true, runValidators: true });
        if (!updatedTask) {
            res.status(404).json({ message: 'Task not found or not authorized to update' });
            return;
        }
        res.status(200).json({
            message: 'Task updated successfully',
            task: updatedTask,
        });
        return;
    }
    catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});
exports.updateTask = updateTask;
// @desc delete task
// @route DELETE /task
// @access private
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params; // Get task ID from route params
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        // Find and delete the task if it belongs to the authenticated user
        const deletedTask = yield todoModel_1.Todo.findOneAndDelete({ _id: id, user: userId });
        if (!deletedTask) {
            res.status(404).json({ message: 'Task not found or not authorized to delete' });
            return;
        }
        res.status(200).json({ message: 'Task deleted successfully' });
        return;
    }
    catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});
exports.deleteTask = deleteTask;

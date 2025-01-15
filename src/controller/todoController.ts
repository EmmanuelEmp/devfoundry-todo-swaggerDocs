import { Request, Response } from 'express';
import { Todo } from '../model/todoModel'; // Adjust the path as necessary


// @desc Create new task
// @route POST /task
// @access private
export const createTask = async (req: Request, res: Response): Promise<void>=> {
  try {
    const { task, start, stop } = req.body;
    // Get the user ID from the authenticated request
    const userId = req.user?.id; // Assuming `req.user` contains the authenticated user's details

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return
    }

    // Validate required fields
    if (!task || !start || !stop) {
      res.status(400).json({ message: 'All fields are required' });
      return
    }

    // Create a new task
    const newTask = await Todo.create({
      task,
      start,
      stop,
      user: userId, // Associate the task with the authenticated user
    });

    res.status(201).json({
      message: 'Task created successfully',
      task: newTask,
    });
    return
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
    return
  }
};

// @desc View all task
// @route GET /task
// @access private
export const viewAllTasks = async (req: Request, res: Response): Promise<void>=> {
  try {
    const userId = req.user?.id; // Assuming `req.user` contains the authenticated user's details

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return
    }

    // Fetch tasks belonging to the authenticated user
    const tasks = await Todo.find({ user: userId });

    if (!tasks.length) {
      res.status(404).json({ message: 'No tasks found for this user' });
      return
    }

    res.status(200).json({ tasks });
    return
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
    return
  }
};

// @desc update task
// @route PUT /task
// @access private
export const updateTask = async (req: Request, res: Response): Promise<void>=> {
  try {
    const { id } = req.params; // Get task ID from route params
    const userId = req.user?.id; // Assuming `req.user` contains the authenticated user's details
    const { task, start, stop } = req.body;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return
    }

    // Find and update the task if it belongs to the authenticated user
    const updatedTask = await Todo.findOneAndUpdate(
      { _id: id, user: userId }, // Match both task ID and user ID
      { task, start, stop, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found or not authorized to update' });
      return
    }

    res.status(200).json({
      message: 'Task updated successfully',
      task: updatedTask,
    });
    return
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
    return
  }
};

// @desc delete task
// @route DELETE /task
// @access private
export const deleteTask = async (req: Request, res: Response): Promise<void>=> {
  try {
    const { id } = req.params; // Get task ID from route params
    const userId = req.user?.id; // Assuming `req.user` contains the authenticated user's details

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return
    }

    // Find and delete the task if it belongs to the authenticated user
    const deletedTask = await Todo.findOneAndDelete({ _id: id, user: userId });

    if (!deletedTask) {
      res.status(404).json({ message: 'Task not found or not authorized to delete' });
      return
    }

    res.status(200).json({ message: 'Task deleted successfully' });
    return
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
    return
  }
};

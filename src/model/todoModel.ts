import mongoose from 'mongoose'
import { ITodo } from './interfaces/todoTypes';

const TodoSchema = new mongoose.Schema<ITodo>({
  task: {
    type: String,
    required: true
  },
  start: {
    type: String,
    required: true 
  },
  stop: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }

})
export const Todo = mongoose.model<ITodo>("Todo", TodoSchema);
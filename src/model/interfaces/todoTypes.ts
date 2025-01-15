import { Types, Document } from "mongoose";

export interface ITodo extends Document {
    task: string;
    start: string;
    stop: string;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }
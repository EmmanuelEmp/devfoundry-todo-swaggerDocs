import { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
  // id: string; //Add this to support the `id` field.
}

import { ObjectId } from 'mongoose';

export interface UserType {
  _id: ObjectId | string; // MongoDB ObjectId or string (if converted to string)
  name: string;
  email: string;
  password: string;
  role: string;
  roomno: string;
  block: string;
  requestType: "Cleaning" | "Maintenance" | "Nothing";
  image: {
    public_id: string;
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

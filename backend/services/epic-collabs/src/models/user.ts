import { Document, Schema } from 'mongoose';

interface IUserInfo {
  userId?: string;
  email?: string;
  picture?: string;
  username?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  createdAt?: number;
  emailVerified?: boolean;
}

interface UserModel extends IUserInfo, Document {}

const UserSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  bio: {
    type: String
  },
  picture: {
    type: String
  },
  createdAt: {
    type: Number
  },
  emailVerified: {
    type: Boolean
  }
});

export { IUserInfo, UserModel, UserSchema };

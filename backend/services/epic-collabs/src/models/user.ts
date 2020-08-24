import { Document, Schema } from 'mongoose';
import { generateAvatar } from '../utils/generate-avatar';

interface IUserModel {
  _id?: string;
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

type UserDocument = IUserModel & Document;

const UserSchema: Schema = new Schema({
  _id: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  bio: {
    type: String,
    trim: true
  },
  picture: {
    type: String,
    default: generateAvatar
  },
  createdAt: {
    type: Number,
    default: Date.now
  },
  emailVerified: {
    type: Boolean
  }
});

export { UserDocument, IUserModel, UserSchema };

import { Document, Schema } from 'mongoose';

interface IUserModel {
  _id: string;
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
    required: true
  },
  username: {
    type: String
  },
  email: {
    type: String
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

export { UserDocument, IUserModel, UserSchema };

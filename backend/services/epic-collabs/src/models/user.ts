import { Document, Schema } from 'mongoose';

interface IUserInfo {
  userId?: string;
  email?: string;
  picture?: string;
  username?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
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
  picture: {
    type: String
  }
});

export { IUserInfo, UserModel, UserSchema };

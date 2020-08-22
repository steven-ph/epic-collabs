import { Document, Schema } from 'mongoose';

interface IUserInfo {
  userId?: string;
  email?: string;
  picture?: string;
  username?: string;
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
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  picture: {
    type: String
  }
});

export { IUserInfo, UserModel, UserSchema };

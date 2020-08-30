import Joi from 'joi';
import { Document, Schema } from 'mongoose';
import { generateAvatar } from '../utils/random-image';
import { optionalEmptyString, optionalEmpty } from './common';

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
  createdProjects?: string[];
  followingProjects?: string[];
  contributingProjects?: string[];
}

type UserDocument = IUserModel & Document;

const UserSchema: Schema = new Schema(
  {
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
    },
    createdProjects: {
      type: [String],
      ref: 'Project',
      default: []
    },
    followingProjects: {
      type: [String],
      ref: 'Project',
      default: []
    },
    contributingProjects: {
      type: [String],
      ref: 'Project',
      default: []
    }
  },
  { versionKey: false }
);

const upsertUserValidationSchema = Joi.object()
  .keys({
    _id: Joi.string().required(),
    email: Joi.string().required(),
    username: optionalEmptyString,
    name: optionalEmptyString,
    firstName: optionalEmptyString,
    lastName: optionalEmptyString,
    bio: optionalEmptyString,
    picture: optionalEmptyString,
    createdAt: optionalEmpty,
    emailVerified: Joi.boolean().optional(),
    createdProjects: Joi.array().items(Joi.string()),
    followingProjects: Joi.array().items(Joi.string()),
    contributingProjects: Joi.array().items(Joi.string())
  })
  .required();

const joinProjectValidationSchema = Joi.object()
  .keys({
    userId: Joi.string().required(),
    projectId: Joi.string().required(),
    positionId: Joi.string().required()
  })
  .required();

const removeUserFromProjectValidationSchema = Joi.object()
  .keys({
    ownerId: Joi.string().required(),
    userId: Joi.string().required(),
    projectId: Joi.string().required(),
    positionId: Joi.string().required()
  })
  .required();

const followProjectValidationSchema = Joi.object()
  .keys({
    userId: Joi.string().required(),
    projectId: Joi.string().required()
  })
  .required();

const unfollowProjectValidationSchema = followProjectValidationSchema;
const leaveProjectValidationSchema = followProjectValidationSchema;

export {
  UserDocument,
  IUserModel,
  UserSchema,
  upsertUserValidationSchema,
  joinProjectValidationSchema,
  followProjectValidationSchema,
  unfollowProjectValidationSchema,
  leaveProjectValidationSchema,
  removeUserFromProjectValidationSchema
};

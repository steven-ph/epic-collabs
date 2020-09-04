import Joi from 'joi';
import { Document, Schema } from 'mongoose';
import { generateAvatar } from '../utils/random-image';
import { optionalEmptyString, optionalEmpty } from './common';

interface ISocialNetworkModel {
  name?: string;
  url?: string;
}

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
  updatedBy?: string;
  emailVerified?: boolean;
  socialNetworks?: ISocialNetworkModel[];
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
    socialNetworks: [
      {
        name: {
          type: String,
          trim: true
        },
        url: {
          type: String,
          trim: true
        }
      }
    ],
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
    updatedBy: optionalEmptyString,
    username: optionalEmptyString,
    name: optionalEmptyString,
    firstName: optionalEmptyString,
    lastName: optionalEmptyString,
    bio: optionalEmptyString,
    picture: optionalEmptyString,
    createdAt: optionalEmpty,
    emailVerified: Joi.boolean().optional(),
    socialNetworks: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        url: Joi.string().required()
      })
    ),
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

const followProjectValidationSchema = Joi.object()
  .keys({
    userId: Joi.string().required(),
    projectId: Joi.string().required()
  })
  .required();

const unfollowProjectValidationSchema = followProjectValidationSchema;
const leaveProjectValidationSchema = followProjectValidationSchema;

const removeUserFromProjectValidationSchema = Joi.object()
  .keys({
    ownerId: Joi.string().required(),
    userId: Joi.string().required(),
    projectId: Joi.string().required(),
    positionId: Joi.string().required()
  })
  .required();

const removePositionFromProjectValidationSchema = Joi.object()
  .keys({
    userId: Joi.string().required(),
    projectId: Joi.string().required(),
    positionId: Joi.string().required()
  })
  .required();

const changeOwnershipValidationSchema = Joi.object()
  .keys({
    projectId: Joi.string().required(),
    fromUserId: Joi.string().required(),
    toUserId: Joi.string().required()
  })
  .required();

export {
  UserDocument,
  IUserModel,
  UserSchema,
  upsertUserValidationSchema,
  joinProjectValidationSchema,
  followProjectValidationSchema,
  unfollowProjectValidationSchema,
  leaveProjectValidationSchema,
  removeUserFromProjectValidationSchema,
  removePositionFromProjectValidationSchema,
  changeOwnershipValidationSchema
};

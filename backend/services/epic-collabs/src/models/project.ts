import Joi from 'joi';
import { Document, Schema } from 'mongoose';
import { Status, Visibility } from '../types/common';
import { generateImage } from '../utils/random-image';
import { optionalEmptyString, optionalEmpty } from './common';

interface ICollaboratorModel {
  userId?: string;
  positionId?: string;
}

interface IResourceModel {
  name?: string;
  url?: string;
}

type ProjectDocument = IProjectModel & Document;

interface IProjectModel {
  _id?: string;
  slug?: string;
  name?: string;
  description?: string;
  image?: string;
  coverImage?: string;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
  updatedBy?: string;
  collaborators?: ICollaboratorModel[];
  categories?: string[];
  resources?: IResourceModel[];
  followers?: string[];
  status?: Status;
  visibility?: Visibility;
}

const ProjectSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: () => generateImage({ width: 200, height: 200 })
  },
  coverImage: {
    type: String,
    default: () => generateImage({ width: 1280, height: 200 })
  },
  createdAt: {
    type: Number,
    default: Date.now
  },
  updatedAt: {
    type: Number,
    default: Date.now
  },
  status: {
    type: String,
    default: Status.OPEN
  },
  visibility: {
    type: String,
    default: Visibility.VISIBLE
  },
  collaborators: [
    {
      userId: {
        type: String,
        ref: 'User'
      },
      positionId: {
        type: String,
        ref: 'Position'
      }
    }
  ],
  categories: {
    type: [String],
    ref: 'Category',
    default: []
  },
  followers: {
    type: [String],
    ref: 'User',
    default: []
  },
  resources: [
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
  createdBy: {
    type: String,
    ref: 'User'
  }
});

const newProjectValidationSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    slug: Joi.string().required(),
    description: Joi.string().required(),
    image: optionalEmptyString,
    coverImage: optionalEmptyString,
    createdAt: optionalEmpty,
    updatedAt: optionalEmpty,
    createdBy: Joi.string().required(),
    status: Joi.any().allow(Status.CLOSED, Status.FINISHED, Status.ON_HOLD, Status.OPEN),
    visibility: Joi.any().allow(Visibility.HIDDEN, Visibility.VISIBLE),
    collaborators: Joi.array().items(
      Joi.object().keys({
        userId: optionalEmptyString,
        positionId: optionalEmptyString
      })
    ),
    categories: Joi.array().items(Joi.string().required()).required(),
    followers: Joi.array().items(Joi.string()),
    resources: Joi.array().items(
      Joi.object().keys({
        name: optionalEmptyString,
        url: optionalEmptyString
      })
    )
  })
  .required();

const updateProjectValidationSchema = Joi.object()
  .keys({
    _id: Joi.string().required(),
    updatedBy: Joi.string().required(),
    name: optionalEmptyString,
    slug: optionalEmptyString,
    description: optionalEmptyString,
    image: optionalEmptyString,
    coverImage: optionalEmptyString,
    createdAt: optionalEmpty,
    updatedAt: optionalEmpty,
    createdBy: optionalEmptyString,
    status: Joi.any().allow(Status.CLOSED, Status.FINISHED, Status.ON_HOLD, Status.OPEN),
    visibility: Joi.any().allow(Visibility.HIDDEN, Visibility.VISIBLE),
    collaborators: Joi.array().items(
      Joi.object().keys({
        userId: optionalEmptyString,
        positionId: optionalEmptyString
      })
    ),
    categories: Joi.array().items(Joi.string()),
    followers: Joi.array().items(Joi.string()),
    resources: Joi.array().items(
      Joi.object().keys({
        name: optionalEmptyString,
        url: optionalEmptyString
      })
    )
  })
  .required();

export { ProjectDocument, IProjectModel, ProjectSchema, newProjectValidationSchema, updateProjectValidationSchema };

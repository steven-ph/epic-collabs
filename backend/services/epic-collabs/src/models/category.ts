import Joi from 'joi';
import { Document, Schema } from 'mongoose';
import { generateAvatar } from '../utils/random-image';
import { Visibility } from '../types/common';
import { optionalEmptyString, optionalEmpty } from './common';

interface ICategoryModel {
  _id?: string;
  name?: string;
  description?: string;
  picture?: string;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
  visibility?: Visibility;
  projects?: string[];
}

type CategoryDocument = ICategoryModel & Document;

const CategorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  picture: {
    type: String,
    default: generateAvatar
  },
  visibility: {
    type: String,
    default: Visibility.VISIBLE
  },
  createdAt: {
    type: Number,
    default: Date.now
  },
  updatedAt: {
    type: Number,
    default: Date.now
  },
  createdBy: {
    type: String,
    ref: 'User'
  },
  projects: {
    type: [String],
    ref: 'Project',
    default: []
  }
});

const newCategoryValidationSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    description: optionalEmptyString,
    picture: optionalEmptyString,
    visibility: Joi.any().allow(Visibility.HIDDEN, Visibility.VISIBLE),
    createdAt: optionalEmpty,
    updatedAt: optionalEmpty,
    createdBy: Joi.string().required(),
    projects: Joi.array().items(Joi.string())
  })
  .required();

export { CategoryDocument, ICategoryModel, CategorySchema, newCategoryValidationSchema };

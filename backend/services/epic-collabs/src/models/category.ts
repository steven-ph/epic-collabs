import { Document, Schema } from 'mongoose';
import { generateAvatar } from '../utils/generate-avatar';
import { Visibility } from '../types/common';
import { ProjectSchema } from './project';
import { UserSchema } from './user';

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
  createdBy: UserSchema,
  projects: [ProjectSchema]
});

export { CategoryDocument, ICategoryModel, CategorySchema };

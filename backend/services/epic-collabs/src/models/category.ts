import { Document, Schema } from 'mongoose';
import { generateAvatar } from '../utils/generate-avatar';

interface ICategoryModel {
  _id?: string;
  name?: string;
  description?: string;
  picture?: string;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
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
    required: true,
    ref: 'User'
  }
});

export { CategoryDocument, ICategoryModel, CategorySchema };

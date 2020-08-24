import { Document, Schema } from 'mongoose';

interface ICategoryModel {
  _id: string;
  name: string;
  description?: string;
  picture?: string;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
}

type CategoryDocument = ICategoryModel & Document;

const CategorySchema: Schema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  picture: {
    type: String
  },
  createdAt: {
    type: Number
  },
  updatedAt: {
    type: Number
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

export { CategoryDocument, ICategoryModel, CategorySchema };

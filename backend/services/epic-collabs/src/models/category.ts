import { Document, Schema } from 'mongoose';

interface ICategory {
  name: string;
  description?: string;
  picture?: string;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
}

interface CategoryModel extends ICategory, Document {}

const CategorySchema: Schema = new Schema({
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

export { ICategory, CategoryModel, CategorySchema };

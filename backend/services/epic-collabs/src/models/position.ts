import { Document, Schema } from 'mongoose';
import { Visibility } from '../types/common';

interface IPositionModel {
  _id?: string;
  name?: string;
  description?: string;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
  projects?: string[];
  visibility?: Visibility;
}

type PositionDocument = IPositionModel & Document;

const PositionSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
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
    ref: 'Project'
  }
});

export { PositionDocument, IPositionModel, PositionSchema };

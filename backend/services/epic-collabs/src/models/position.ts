import { Document, Schema } from 'mongoose';

interface IPositionModel {
  _id?: string;
  name?: string;
  description?: string;
  createdAt?: number;
  updatedAt?: number;
  createdBy?: string;
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

export { PositionDocument, IPositionModel, PositionSchema };

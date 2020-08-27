import unsplash from 'unsplash';
import { Document, Schema } from 'mongoose';
import { CategorySchema } from './category';
import { PositionSchema } from './position';
import { Status, Visibility } from '../types/common';
import { UserSchema } from './user';

interface IResourceModel {
  _id?: string;
  name?: string;
  url?: string;
}

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
  positions?: string[];
  categories: string[];
  resources: IResourceModel[];
  followers: string[];
  status?: Status;
  visibility?: Visibility;
}

type ProjectDocument = IProjectModel & Document;

const ProjectSchema: Schema = new Schema({
  createdBy: UserSchema,
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
    default: () => unsplash(200, 200)
  },
  coverImage: {
    type: String,
    default: () => unsplash(1280, 200)
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
  positions: [
    {
      userId: UserSchema,
      positionId: PositionSchema
    }
  ],
  categories: [CategorySchema],
  followers: [UserSchema],
  resources: [
    {
      _id: {
        type: String,
        trim: true
      },
      name: {
        type: String,
        trim: true
      },
      url: {
        type: String,
        trim: true
      }
    }
  ]
});

export { ProjectDocument, IProjectModel, ProjectSchema };

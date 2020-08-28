import { Document, Schema } from 'mongoose';
import { UserSchema } from './user';
import { CategorySchema } from './category';
import { PositionSchema } from './position';
import { Status, Visibility } from '../types/common';
import { generateImage } from '../utils/random-image';

interface ICollaboratorModel {
  userId?: string;
  positionId?: string;
}

type CollaboratorDocument = ICollaboratorModel & Document;

const CollaboratorSchema: Schema = new Schema({
  userId: UserSchema,
  positionId: PositionSchema
});

interface IResourceModel {
  _id?: string;
  name?: string;
  url?: string;
}

type ResourceDocument = IResourceModel & Document;

const ResourceSchema: Schema = new Schema({
  name: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    trim: true
  }
});

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
  collaborators?: ICollaboratorModel[];
  categories?: string[];
  resources?: IResourceModel[];
  followers?: string[];
  status?: Status;
  visibility?: Visibility;
}

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
  collaborators: [CollaboratorSchema],
  categories: [CategorySchema],
  followers: [UserSchema],
  resources: [ResourceSchema]
});

export {
  ProjectDocument,
  IProjectModel,
  ProjectSchema,
  CollaboratorDocument,
  ICollaboratorModel,
  CollaboratorSchema,
  ResourceDocument,
  IResourceModel,
  ResourceSchema
};

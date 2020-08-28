import { Document, Schema } from 'mongoose';
import { UserSchema } from './user';
import { Status, Visibility } from '../types/common';
import { generateImage } from '../utils/random-image';

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
    ref: 'Category'
  },
  followers: {
    type: [String],
    ref: 'User'
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
  ]
});

export { ProjectDocument, IProjectModel, ProjectSchema };

import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Project {
    _id: ID
    slug: String
    name: String
    description: String
    image: String
    coverImage: String
    createdAt: Float
    updatedAt: Float
    createdBy: User
    collaborators: [Collaborator]
    categories: [Category]
    resources: [Resource]
    followers: [User]
    status: Status
    visibility: Visibility
  }

  type Collaborator {
    user: User
    position: Position
  }

  type Resource {
    _id: ID
    name: String
    url: String
  }

  input AddProjectInput {
    slug: String!
    name: String!
    description: String!
    image: String
    coverImage: String
    createdAt: Float
    updatedAt: Float
    createdBy: String
    collaborators: [CollaboratorInput!]
    categories: [String!]!
    resources: [ResourceInput!]
    followers: [String!]
    status: Status
    visibility: Visibility
  }

  input CollaboratorInput {
    userId: ID
    positionId: ID
  }

  input ResourceInput {
    name: String
    url: String
  }

  type Query {
    projectById(id: String!): Project
    projectsByIds(ids: [String!]!): [Project]
    allProjects: [Project]
  }

  type Mutation {
    addProject(input: AddProjectInput!): Project @auth(roles: [VIEWER], throwError: true)
  }
`;

export { typeDefs };

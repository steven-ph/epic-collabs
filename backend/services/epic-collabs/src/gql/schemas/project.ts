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

  input ProjectInput {
    _id: ID
    slug: String!
    name: String!
    description: String!
    image: String
    coverImage: String
    createdAt: Float
    updatedAt: Float
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

  input ChangeProjectOwnershipInput {
    projectId: String
    toUserId: String
  }

  type Query {
    projectById(id: String!): Project
    projectsByIds(ids: [String!]!): [Project]
    allProjects: [Project]
  }

  type Mutation {
    newProject(input: ProjectInput!): Project @auth(roles: [VIEWER], throwError: true)
    updateProject(input: ProjectInput!): Project @auth(roles: [VIEWER], throwError: true)
    changeProjectOwnership(input: ChangeProjectOwnershipInput!): Project @auth(roles: [VIEWER], throwError: true)
  }
`;

export { typeDefs };

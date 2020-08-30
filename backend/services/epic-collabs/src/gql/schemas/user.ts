import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    picture: String
    username: String
    name: String
    firstName: String
    lastName: String
    bio: String
    createdAt: Float
    emailVerified: Boolean
    createdProjects: [Project]
    followingProjects: [Project]
    contributingProjects: [Project]
  }

  type Query {
    me: User @auth(roles: [VIEWER], throwError: true)
    userById(id: String!): User
    usersByIds(ids: [String!]!): [User]
    userByEmail(email: String!): User
    usersByEmails(emails: [String!]!): [User]
  }

  input JoinProjectInput {
    projectId: String!
    positionId: String!
  }

  type JoinProjectResult {
    _id: ID
    success: Boolean
    project: Project
  }

  input FollowProjectInput {
    projectId: String!
  }

  type FollowProjectResult {
    _id: ID
    success: Boolean
    project: Project
  }

  input UnfollowProjectInput {
    projectId: String!
  }

  type UnfollowProjectResult {
    _id: ID
    success: Boolean
    project: Project
  }

  input LeaveProjectInput {
    projectId: String!
  }

  type LeaveProjectResult {
    _id: ID
    success: Boolean
    project: Project
  }

  input RemoveUserFromProjectInput {
    userId: String!
    projectId: String!
    positionId: String!
  }

  type RemoveUserFromProjectResult {
    _id: ID
    success: Boolean
    project: Project
  }

  type Mutation {
    joinProject(input: JoinProjectInput!): JoinProjectResult @auth(roles: [VIEWER], throwError: true)
    followProject(input: FollowProjectInput!): FollowProjectResult @auth(roles: [VIEWER], throwError: true)
    unfollowProject(input: UnfollowProjectInput!): UnfollowProjectResult @auth(roles: [VIEWER], throwError: true)
    leaveProject(input: LeaveProjectInput!): LeaveProjectResult @auth(roles: [VIEWER], throwError: true)
    removeUserFromProject(input: RemoveUserFromProjectInput!): RemoveUserFromProjectResult @auth(roles: [VIEWER], throwError: true)
  }
`;

export { typeDefs };

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

  input FollowProjectInput {
    projectId: String!
  }

  input UnfollowProjectInput {
    projectId: String!
  }

  input LeaveProjectInput {
    projectId: String!
  }

  type Mutation {
    joinProject(input: JoinProjectInput!): Boolean @auth(roles: [VIEWER], throwError: true)
    followProject(input: FollowProjectInput!): Boolean @auth(roles: [VIEWER], throwError: true)
    unfollowProject(input: UnfollowProjectInput!): Boolean @auth(roles: [VIEWER], throwError: true)
    leaveProject(input: LeaveProjectInput!): Boolean @auth(roles: [VIEWER], throwError: true)
  }
`;

export { typeDefs };

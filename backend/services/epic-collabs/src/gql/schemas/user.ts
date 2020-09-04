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
    socialNetworks: [SocialNetwork]
    emailVerified: Boolean
    createdProjects: [Project]
    followingProjects: [Project]
    contributingProjects: [Project]
  }

  input UpdateProfileInput {
    _id: ID!
    bio: String
    socialNetworks: [SocialNetworkInput]
  }

  type UpdateProfileResult {
    _id: ID
    success: Boolean
    profile: User
  }

  type SocialNetwork {
    _id: ID
    name: String
    url: String
  }

  input SocialNetworkInput {
    name: String
    url: String
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

  input RemovePositionFromProjectInput {
    projectId: String!
    positionId: String!
  }

  type RemovePositionFromProjectResult {
    _id: ID
    success: Boolean
    project: Project
  }

  input ChangeProjectOwnershipInput {
    projectId: String
    toUserId: String
  }

  type ChangeProjectOwnershipResult {
    _id: ID
    success: Boolean
    project: Project
  }

  type Query {
    me: User @auth(roles: [VIEWER], throwError: true)
    userById(id: String!): User
    usersByIds(ids: [String!]!): [User]
    userByEmail(email: String!): User
    usersByEmails(emails: [String!]!): [User]
  }

  type Mutation {
    updateProfile(input: UpdateProfileInput!): UpdateProfileResult @auth(roles: [VIEWER], throwError: true)
    joinProject(input: JoinProjectInput!): JoinProjectResult @auth(roles: [VIEWER], throwError: true)
    followProject(input: FollowProjectInput!): FollowProjectResult @auth(roles: [VIEWER], throwError: true)
    unfollowProject(input: UnfollowProjectInput!): UnfollowProjectResult @auth(roles: [VIEWER], throwError: true)
    leaveProject(input: LeaveProjectInput!): LeaveProjectResult @auth(roles: [VIEWER], throwError: true)
    removeUserFromProject(input: RemoveUserFromProjectInput!): RemoveUserFromProjectResult @auth(roles: [VIEWER], throwError: true)
    removePositionFromProject(input: RemovePositionFromProjectInput!): RemovePositionFromProjectResult @auth(roles: [VIEWER], throwError: true)
    changeProjectOwnership(input: ChangeProjectOwnershipInput!): ChangeProjectOwnershipResult @auth(roles: [VIEWER], throwError: true)
  }
`;

export { typeDefs };

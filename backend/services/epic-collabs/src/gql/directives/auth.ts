import { get } from 'lodash';
import { defaultFieldResolver } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

const supportedRoles = {
  VIEWER: viewer => !!get(viewer, 'id')
};

const hasPermission = (allowedRoles, viewer) => {
  return allowedRoles.some(allowed => {
    const defaultPermissionHandler = () => false;
    const permissionHandler = get(supportedRoles, allowed) || defaultPermissionHandler;
    return permissionHandler(viewer);
  });
};

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const roles = get(this, 'args.roles') || [];
    const throwError = get(this, 'args.throwError') || false;
    const resolve = get(field, 'resolve') || defaultFieldResolver;
    field.description = `restricted to: [${roles}]`;
    field.resolve = (...resolveArgs) => {
      // resolveArgs [root, args, context, info]
      const context = get(resolveArgs, '2') || {};
      const viewer = get(context, 'viewer') || {};

      if (hasPermission(roles, viewer)) {
        return resolve.apply(this, resolveArgs);
      }

      if (throwError) {
        throw new Error(`This field requires ${JSON.stringify(roles)} access`);
      }

      return null;
    };
  }
}

const generateRoleEnum = () => {
  const opening = `enum Role {`;
  const roles = Object.keys(supportedRoles).join('\n');
  const closing = `}`;

  return opening.concat(roles).concat(closing);
};

const roleEnum = generateRoleEnum();

const directiveEnum = `
  directive @auth(
    roles: [Role!]
    throwError: Boolean
  ) on FIELD_DEFINITION
`;

const authDirective = {
  directive: AuthDirective,
  typeDef: roleEnum.concat(directiveEnum)
};

export { authDirective };

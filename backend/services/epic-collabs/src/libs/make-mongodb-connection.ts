import { isNil } from 'lodash';
import mongoose, { Connection } from 'mongoose';
import { UserDocument, UserSchema } from '../models/user';
import { CategoryDocument, CategorySchema } from '../models/category';
import { PositionDocument, PositionSchema } from '../models/position';

let connection = null;

const makeConnectionWithModels = (conn: Connection) => {
  conn.model<UserDocument>('User', UserSchema);
  conn.model<CategoryDocument>('Category', CategorySchema);
  conn.model<PositionDocument>('Position', PositionSchema);

  return conn;
};

const makeMongoDbConnection = async (uri): Promise<Connection> => {
  if (!isNil(connection)) {
    return connection;
  }

  return mongoose
    .createConnection(uri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0
    })
    .then(makeConnectionWithModels)
    .then(conn => {
      connection = conn;
      return connection;
    });
};

export { makeMongoDbConnection };

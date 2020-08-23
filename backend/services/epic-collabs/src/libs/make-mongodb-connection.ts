import { isNil } from 'lodash';
import mongoose, { Connection } from 'mongoose';
import { UserModel, UserSchema } from 'models/user';

let connection = null;

const makeConnectionWithModels = (conn: Connection) => {
  conn.model<UserModel>('User', UserSchema);

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

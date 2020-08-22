import mongoose, { Connection } from 'mongoose';
import { UserModel, UserSchema } from '../models/user';

let connection = null;

const makeConnectionWithModels = (conn: Connection) => {
  conn.model<UserModel>('User', UserSchema);

  return conn;
};

const makeMongoDbConnection = async (uri): Promise<Connection> => {
  if (connection) {
    return connection;
  }

  return mongoose
    .createConnection(uri, {
      useNewUrlParser: true,
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

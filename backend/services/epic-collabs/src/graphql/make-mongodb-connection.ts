import mongoose from 'mongoose';

let connection = null;
const makeMongoDbConnection = async uri => {
  if (connection) {
    return connection;
  }

  connection = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    bufferMaxEntries: 0
  });

  await connection;

  return connection;
};

export { makeMongoDbConnection };

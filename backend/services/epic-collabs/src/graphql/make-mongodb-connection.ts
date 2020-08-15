import mongoose from 'mongoose';

let connection = null;
const makeMongoDbConnection = async () => {
  if (connection) {
    return;
  }

  connection = mongoose.createConnection(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    bufferMaxEntries: 0
  });

  await connection;

  return connection;
};

export { makeMongoDbConnection };

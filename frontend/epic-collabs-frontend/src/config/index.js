const getConfigForEnvironment = env => {
  const environment = env || process.env.STAGE;

  try {
    return {
      ...require(`./${environment}.config.js`)
    };
  } catch (err) {
    throw new Error(`Could not find config for ${environment}`);
  }
};

const getConfig = () => getConfigForEnvironment(process.env.STAGE);

module.exports = { getConfig };

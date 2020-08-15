import { makeKloudStore } from '@sp-tools/kloud-parameter';

const { stage } = process.env;
const configPath = `/${stage}/epic-collabs/config`;
const secretPath = `/${stage}/epic-collabs/secret`;

export interface Parameters {}

const kloudStore = makeKloudStore({
  configPath,
  secretPath,
  provider: {
    tableName: `kloud-config-epic-collabs-service-${stage}`
  }
});

export const getParameters = (): Promise<Parameters> => {
  return Promise.all([kloudStore.getConfigs([]), kloudStore.getSecrets([])]).then(([configs, secrets]) => Object.assign(configs, secrets));
};

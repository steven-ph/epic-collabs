import { find, map, reduce } from 'lodash';

interface IMongoFindManyInput {
  db: any;
  key: string;
  values: string[];
}

interface IBuildDataMapForLoaderInput {
  key: string;
  ids: string[];
  values: any[];
}

interface ILoaderInput {
  db: any;
  key: string;
  ids: string[];
}

const mongoFindMany = async ({ db, key, values }: IMongoFindManyInput): Promise<any[]> => {
  return db.find().where(key).in(values).exec();
};

const buildDataMapForLoader = ({ key, ids, values }: IBuildDataMapForLoaderInput) => {
  return reduce(
    ids,
    (obj, id) => {
      obj[id] = find(values, { [key]: id });
      return obj;
    },
    {}
  );
};

const makeLoader = async ({ db, key, ids }: ILoaderInput): Promise<any[]> => {
  const results = await mongoFindMany({ db, key, values: ids });

  const resultsMap = buildDataMapForLoader({ key, ids, values: results });

  return map(ids, id => resultsMap[id] || null);
};

export { makeLoader, buildDataMapForLoader, mongoFindMany };

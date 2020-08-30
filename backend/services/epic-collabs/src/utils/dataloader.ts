import { get, find, isEqual, isObject, map, reduce } from 'lodash';

interface IFindManyInput {
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

const findMany = async ({ db, key, values }: IFindManyInput): Promise<any[]> => {
  return db.find().where(key).in(values).lean().exec();
};

const buildDataMapForLoader = ({ key, ids, values }: IBuildDataMapForLoaderInput) => {
  return reduce(
    ids,
    (obj, id) => {
      const found = find(values, val => {
        const valueforKey = get(val, key);

        if (key === '_id' && isObject(valueforKey)) {
          return isEqual(valueforKey.toString(), id);
        }

        return isEqual(valueforKey, id);
      });

      obj[id] = found ? { ...found, _id: found._id && isObject(found._id) ? found._id.toString() : found._id } : null;

      return obj;
    },
    {}
  );
};

const makeLoader = async ({ db, key, ids }: ILoaderInput): Promise<any[]> => {
  const results = await findMany({ db, key, values: ids });

  const resultsMap = buildDataMapForLoader({ key, ids, values: results });

  return map(ids, id => resultsMap[id] || null);
};

export { makeLoader, buildDataMapForLoader, findMany };

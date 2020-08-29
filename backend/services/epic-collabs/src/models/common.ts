import Joi from 'joi';

const optionalEmptyString = Joi.any().allow('').allow(null).optional();
const optionalEmpty = Joi.any().allow(null).optional();

export { optionalEmptyString, optionalEmpty };

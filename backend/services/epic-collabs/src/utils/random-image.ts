import { get } from 'lodash';
import fetch from 'node-fetch';
import { generate } from 'shortid';
import { logger } from '@sp-tools/kloud-logger';

const generateAvatar = () => `https://gravatar.com/avatar/${generate()}?d=identicon`;

const generateImage = ({ width, height }) => `https://picsum.photos/${width}/${height}`;

const getRandomImage = async ({ width, height }) => {
  return fetch(`https://source.unsplash.com/random/${width}x${height}/?nature`)
    .then(response => {
      const url = get(response, 'url');

      if (url) {
        return url;
      }

      logger.warn('getRandomImage error: No URL returned', null, { width, height });

      return generateImage({ width, height });
    })
    .catch(error => {
      logger.warn('getRandomImage error', null, { width, height }, error);

      return generateImage({ width, height });
    });
};

export { generateAvatar, generateImage, getRandomImage };

import { getConfig } from 'config';

const { CLOUDINARY_ACCOUNT, CLOUDINARY_BASE_URL } = getConfig();

const attributeMap = {
  width: {
    name: 'w',
    defaultValue: null
  },
  height: {
    name: 'h',
    defaultValue: null
  },
  aspectRatio: {
    name: 'ar',
    defaultValue: null
  },
  quality: {
    name: 'q',
    defaultValue: 'auto'
  },
  focus: {
    name: 'g',
    defaultValue: null
  }
};

const makeBuildOptimizedSrc = (options = {}) => src => {
  const transforms = Object.keys(attributeMap)
    .reduce((accum, key) => {
      const value = options[key] || attributeMap[key].defaultValue;
      if (value) {
        accum.push(`${attributeMap[key].name}_${value}`);
      }
      return accum;
    }, [])
    .join(',');

  if (!src) {
    return src;
  }

  return [`${CLOUDINARY_BASE_URL}/${CLOUDINARY_ACCOUNT}/image/fetch`]
    .concat(transforms)
    .concat(encodeURIComponent(src))
    .join('/');
};

const ImageOptimizer = ({ children, ...options }) => {
  const buildOptimizedSrc = makeBuildOptimizedSrc(options);

  return children({ buildOptimizedSrc });
};

const buildOptimizedSrc = makeBuildOptimizedSrc();

export { ImageOptimizer, buildOptimizedSrc, makeBuildOptimizedSrc };

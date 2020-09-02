const makeBuildOptimizedSrc = () => () => {
  return 'https://cloudinary.com';
};

const buildOptimizedSrc = makeBuildOptimizedSrc();

const ImageOptimizer = ({ children }) => {
  return children({ buildOptimizedSrc });
};

export { ImageOptimizer, buildOptimizedSrc, makeBuildOptimizedSrc };

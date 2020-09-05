import React, { useState, useEffect, useRef } from 'react';
import { colors } from 'styles';

const STATUS = {
  PENDING: 'pending',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed'
};

const ProgressiveImage = ({ src, srcSet, onLoad, onError, preload = () => {}, fallback, children }) => {
  const imageRef = useRef();
  const [status, setStatus] = useState(src ? STATUS.LOADING : STATUS.PENDING);

  const handleLoad = event => {
    destroyLoader();
    setStatus(STATUS.LOADED);

    onLoad && onLoad(event);
  };

  const handleError = error => {
    destroyLoader();
    setStatus(STATUS.FAILED);

    onError && onError(error);
  };

  const createLoader = () => {
    destroyLoader();

    imageRef.current = new Image();
    imageRef.current.onload = e => handleLoad(e);
    imageRef.current.onerror = e => handleError(e);
    imageRef.current.src = src;

    imageRef.current.srcset = srcSet || src;
  };

  const destroyLoader = () => {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
      imageRef.current = null;
    }
  };

  useEffect(() => {
    if (status === STATUS.LOADING) {
      createLoader();
    }

    return () => destroyLoader();
  });

  useEffect(() => {
    setStatus(src ? STATUS.LOADING : STATUS.PENDING);
  }, [src]);

  useEffect(() => {
    if (status === STATUS.LOADING && !imageRef.current) {
      createLoader();
    }
  });

  return (
    <>
      {status === STATUS.LOADED && React.cloneElement(children, { src, srcSet })}
      {status === STATUS.FAILED &&
        (fallback
          ? fallback()
          : React.cloneElement(children, {
              style: { background: `${colors.navy}` },
              srcSet
            }))}
      {(status === STATUS.LOADING || status === STATUS.PENDING) && preload()}
    </>
  );
};

export { ProgressiveImage };

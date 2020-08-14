const makeContext = ({ event }) => {
  if (!event) {
    return Promise.reject(new Error('No lambda event detected'));
  }

  return {
    viewer: {
      id: 'my-user-id'
    }
  };
};

export { makeContext };

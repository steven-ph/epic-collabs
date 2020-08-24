import md5 from 'md5';

const generateAvatar = () => {
  const random = Date.now().toString().replace(/\s+/g, '');

  return `https://gravatar.com/avatar/${md5(random)}?d=identicon`;
};

export { generateAvatar };

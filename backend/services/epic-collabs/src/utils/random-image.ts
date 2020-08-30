import { generate } from 'shortid';

const generateAvatar = () => `https://gravatar.com/avatar/${generate()}?d=identicon`;

const generateImage = ({ width, height }) => `https://picsum.photos/${width}/${height}`;

export { generateAvatar, generateImage };

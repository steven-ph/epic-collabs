import { v4 as uuidv4 } from 'uuid';

const generateAvatar = () => `https://gravatar.com/avatar/${uuidv4()}?d=identicon`;

const generateImage = ({ width, height }) => `https://picsum.photos/${width}/${height}`;

export { generateAvatar, generateImage };

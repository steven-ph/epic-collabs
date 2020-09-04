const patterns = {
  biography: ['<script', '</script']
};

const bioValidator = (rule, value, callback) => {
  const result = patterns.biography.reduce((accum, current) => {
    if (value && value.includes(current)) {
      // eslint-disable-next-line no-param-reassign
      accum += 1;
      return accum;
    }
    return accum;
  }, 0);

  if (result > 0) {
    callback('Please enter only text and punctuation or valid Markdown');
  }

  return callback();
};

export { bioValidator };

const randomCharacter = (length) => {
  return Math.random().toString(36).substring(2, length);
};

module.exports = {
  randomCharacter,
};

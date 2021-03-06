/**
 * @returns {String} unique id
 */
const generateId = () =>
  `_${Math.random()
    .toString(36)
    .substr(2, 9) +
    Math.random()
      .toString(36)
      .substr(2, 9)}`;
module.exports = {
  generateId,
};

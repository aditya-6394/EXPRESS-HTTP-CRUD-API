/* eslint-disable no-unused-vars */
const errorHandler = (error, req, res, next) => {
  const errorCode = error.statusCode || 400;
  res.status(errorCode).send(error.message);
};
const invalidUrl = (req, res) => {
  res.status(400).send('Invalid URL');
};

module.exports.errorHandler = errorHandler;
module.exports.invalidUrl = invalidUrl;

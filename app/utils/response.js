const status = require("http-status");

const createSuccessResponse = (statusCode, message, data) => {
  return {
    status: "Success",
    statusCode,
    message,
    data,
  };
};

const createErrorResponse = (statusCode, message, error) => {
  return {
    status: "Error",
    statusCode,
    message,
    error,
  };
};

module.exports = {
  createErrorResponse,
  createSuccessResponse,
};

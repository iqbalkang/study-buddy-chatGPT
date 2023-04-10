const { StatusCodes } = require("http-status-codes");

const sendSuccess = (res, data) => {
  return res.status(StatusCodes.OK).json({
    status: "success",
    isError: false,
    data: data,
  });
};

module.exports = sendSuccess;
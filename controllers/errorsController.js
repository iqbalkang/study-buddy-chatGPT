const sendErrorDev = (err, res) => {
  console.log(err.stack);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    isError: true,
    message: err.message
  })
}

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    console.log(err.message);
    res.status(err.statusCode).json({
      status: err.status,
      isError: true,
      message: err.message,
    })

    // Programming or other unknown error
  } else {
    // 1) Log error
    console.error('ERROR 💥: ', err)

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      isError: true,
      message: "Something went very wrong!",
    });
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err }
    sendErrorProd(error, res)
  }
}

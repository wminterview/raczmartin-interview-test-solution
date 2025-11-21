exports.success = (res, data = {}, status = 200) => {
  return res.status(status).json({
    success: true,
    data,
    message: 'Operation successful',
  });
};

exports.error = (res, message, status = 400) => {
  return res.status(status).json({
    success: false,
    message
  });
};

exports.validationError = (res, details = []) => {
  return res.status(400).json({
    success: false,
    error: {
      message: 'Validation failed',
      details,
    },
  });
};


exports.notFoundError = (res) => {
  return res.status(404).json({
    success: false,
    message: 'Record not found',
  });
};

exports.paginated = (res, books = [], pagination = {}, status = 200) => {
  return res.status(status).json({
    success: true,
    data: {
      books,
      pagination,
    },
    message: 'Operation successful',
  });
};
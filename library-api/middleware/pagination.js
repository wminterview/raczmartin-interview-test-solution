module.exports = (req, res, next) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
  req.pagination = {
    page,
    limit,
    offset: (page - 1) * limit,
  };
  next();
};
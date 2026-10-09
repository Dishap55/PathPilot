function getPagination(req, defaultLimit = 20) {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || defaultLimit;
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

module.exports = { getPagination };

const handleHttpError = (
  res,
  message = "something bad happened",
  code = 403
) => {
  res.status(code);
  res.send({ error: message });
};

module.exports = { handleHttpError };

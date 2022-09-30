const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.api_key;
    if (apiKey === "hello-123") {
      next();
    } else {
      res.status(403).send({ err: "incorrect api key" });
    }
  } catch (err) {
    res.status(403).send({ err: "something went wrong with headers!" });
  }
};

module.exports = customHeader;

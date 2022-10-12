const mongoose = require("mongoose");
require("dotenv").config();

const dbConnectNoSql = () => {
  const DB_URI = process.env.DB_URI;
  mongoose.connect(
    DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, res) => {
      if (!err) {
        console.log("*****CONNECTION SUCCESSFULL***");
      } else {
        console.log("****CONNECTION ERROR!!****");
      }
    }
  );
};

module.exports = dbConnectNoSql;

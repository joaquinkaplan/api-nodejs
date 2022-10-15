const dbConnectNoSql = require("./mongo");
const { sequelize, dbConnectMySql } = require("./mysql");

module.exports = { dbConnectNoSql, dbConnectMySql, sequelize };

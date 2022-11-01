const Sequelize = require("sequelize");
const db = require("../db");

const Connection = db.define("connection", {});

module.exports = Connection;

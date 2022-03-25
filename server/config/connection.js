const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/portfolio-db");

module.exports = mongoose.connection;

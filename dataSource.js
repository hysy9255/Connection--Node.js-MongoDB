const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.URI;

const mongoclient = new MongoClient(uri);

module.exports = { mongoclient };

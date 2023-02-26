const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.URI;

const mongoclient = new MongoClient(uri);
const collection = mongoclient.db("football").collection("player");

module.exports = { mongoclient, collection };

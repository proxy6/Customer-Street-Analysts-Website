/* eslint-disable no-console */
require('dotenv').config();
const mongoose = require("mongoose");

const { NODE_ENV, DBUSER, DBPASSWORD, DBNAME, DBPORT, DBHOST } = process.env;

const isProduction = NODE_ENV === "production";
const connectionStringProd = process.env.DBURL_PROD
const connectionStringDev = process.env.DBURL;

const connection = mongoose
    .connect(isProduction ? connectionStringProd : connectionStringDev, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected");
        if (process.send) {
            process.send("ready");
        }
    })
    .catch((e) => {
        console.log(e)
        console.error("An error occured while trying to connect with the database");
        process.exit(0);
    });

mongoose.connection.once("disconnected", (e) => {
    console.log(e);
    console.log("Database disconnected");
    process.exit(0);
});

module.exports = connection;

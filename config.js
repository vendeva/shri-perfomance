const axios = require("axios");
const https = require("https");
const dotenv = require("dotenv");
const path = require("path");
const util = require("util");
const { execFile } = require("child_process");

dotenv.config({
    path: path.resolve(__dirname, ".env"),
});

module.exports = {
    PORT: 8000,
    instance: axios.create({
        baseURL: "https://shri.yandex/hw/api",
        timeout: 5000,
        headers: {
            Authorization: "Bearer " + process.env["API_TOKEN"],
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    }),
    useLocalPath: path.resolve(__dirname, "localRepository"),
    useLogsPath: path.resolve(__dirname, "logs"),
    execPromise: util.promisify(execFile),
};

global.config = require(process.env.NODE_ENV === "production" ? "../env/config-prod.json" : "../env/config-dev.json");
const express = require("express");
const authController = require("../controller-layer/auth-controller");
const adminController = require("../controller-layer/admin-controller");
const flightController = require("../controller-layer/flight-controller");
const articleController = require("../controller-layer/article-controller");
const orderFlightController = require("../controller-layer/order-flight-controller");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const server = express();
const serverless = require("serverless-http");
const path = require("path");
const bodyParser = require('body-parser');
// // Enable sending an receiving cookies from the front:

// //Enabling cors to access from all ip address, allowing json as response and allowing file uploading.
server.use(bodyParser.json());
server.use(cors())
server.use(express.json());
server.use(fileUpload());

server.use(express.static(path.join(__dirname, "../dist")));

// //ExpressJS Routes to controllers.
server.use("/.netlify/functions/app/api/auth", authController);
server.use("/.netlify/functions/app/api/admin", adminController);
server.use("/.netlify/functions/app/api/article", articleController);
server.use("/.netlify/functions/app/api/flight", flightController);
server.use("/.netlify/functions/app/api/order-flight", orderFlightController);

server.use("*", (request, response) => {
    response.sendFile(path.join(__dirname, '../dist/index.html'))
});

// // //listening to environment Port on production or 3001 on developing;
// const port = process.env.PORT || 3001;
// server.listen(port, () => console.log("Listening...."));

module.exports = server;
module.exports.handler = serverless(server);

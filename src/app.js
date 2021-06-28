// global.config = require(process.env.NODE_ENV === "production" ? "../env/config-prod.json" : "../env/config-dev.json");
// const express = require("express");
// const authController = require("../controller-layer/auth-controller");
// const adminController = require("../controller-layer/admin-controller");
// const flightController = require("../controller-layer/flight-controller");
// const articleController = require("../controller-layer/article-controller");
// const orderFlightController = require("../controller-layer/order-flight-controller");
// const cors = require("cors");
// const fileUpload = require("express-fileupload");
// const server = express();
// const serverless = require("serverless-http");
// const path = require("path");
// // Enable sending an receiving cookies from the front:

// //Enabling cors to access from all ip address, allowing json as response and allowing file uploading.
// server.use(cors())
// server.use(express.json());
// server.use(fileUpload());

// //ExpressJS Routes to controllers.
// server.use("/api/auth", authController);
// server.use("/api/admin", adminController);
// server.use("/api/article", articleController);
// server.use("/api/flight", flightController);
// server.use("/api/order-flight", orderFlightController);

// server.use("*", (request, response) => {
//     response.sendFile(path.join(__dirname, "./dist/index.html"))
// });

// // //listening to environment Port on production or 3001 on developing;
// const port = process.env.PORT || 3001;
// server.listen(port, () => console.log("Listening...."));

// module.exports.handler = serverless(server);
'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello from Express.js!</h1>');
    res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

module.exports = app;
module.exports.handler = serverless(app);
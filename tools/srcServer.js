"use strict";

import express from 'express';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import http from "http";
import https from "https";

const PORT = process.env.PORT || 3001;
const httpApp = express();
const app = express();
const MONGOURL = process.env.MONGODB_URI || "mongodb://windupdurb-admin-remote:So-we-beat-on@ec2-52-8-177-223.us-west-1.compute.amazonaws.com:27017/essays";
const compiler = webpack(config);
/* eslint-disable no-console */

const httpsOptions = {
    key: fs.readFileSync("../CCCprivate.key"),
    certificate: fs.readFileSync("../CCCcertificate.pem")
};


httpApp.set("port", 80);

mongoose.connect(MONGOURL, function (error) {
    console.log(error || `Connected to MongoDB at ${MONGOURL}`);
});

httpApp.get("*", (request, response, next) => {
    response.redirect(`https://${request.headers.host}/${request.path}`);
});

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));


app.use(express.static(__dirname));


app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use("/api", require("./routes/api"));

app.use("*", require("./routes/index"));

http.createServer(httpApp).listen(httpApp.get('port'), function() {
    console.log('Express HTTP server listening on port ' + httpApp.get('port'));
});

https.createServer(httpsOptions, app).listen(app.get('port'), function() {
    console.log('Express HTTPS server listening on port ' + app.get('port'));
});
// app.listen(PORT, function(err) {
//     console.log(err || `Listening on port ${PORT}`);
// });

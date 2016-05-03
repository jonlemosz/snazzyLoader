var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var errorHandler = require("errorhandler");
var hostname = process.env.HOSTNAME || "localhost";
var port = 8080;

var stylesURL = "https://snazzymaps.com/explore.json?key=204b899c-9130-4202-afb4-8fa9491c91e5";

var request = require("request");

app.get("/listStyles", function(req, res){
    request({
        url: stylesURL,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.send(body);
        }
    })
});

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + "/public"));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);
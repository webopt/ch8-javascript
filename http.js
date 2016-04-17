"use strict";
var express = require("express"),
	compression = require("compression"),
	fs = require("fs"),
	app = express();

// Run static server
app.use(compression());

app.post("/js/response.json", function(req, res){
	fs.readFile(__dirname + "/js/response.json", function(err, data){
		res.send(data.toString());
	});
});

app.use(express.static(__dirname));
app.listen(8080);
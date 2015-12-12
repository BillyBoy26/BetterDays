/**
 * Created by Denis on 12/12/2015.
 */
var routes = require('routes');
var http = require('http');
var path = require('path');
var fs = require('fs');


try {
    var json = fs.readFileSync( "../configPaypal.json");
    var configPaypal = JSON.parse(json.toString());
} catch (e) {
    console.error("File config.json not found or is invalid: " + e.message);
    process.exit(1);
}
routes.init(configPaypal);

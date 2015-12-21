/**
 * Created by Denis on 21/12/2015.
 */
var pg = require('pg');
var config = require('../configuration/configPostgres')
var client = new pg.Client(config.conString);
module.exports = client;
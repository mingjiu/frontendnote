var express = require('express');
var app = express();
app.use(express.static('zhgj'));

var zhbusHttp = require('./module/zhbusHttp');
var qs = require('querystring');
var apiMap = require('./module/apiMap');
var _ = require('underscore');


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

_.each(apiMap, function(api){
    var a = app.get(api.link, function(request, response){
        zhbusHttp.get({
            api: api,
            data: request.query
        }, function(result){
            response.send(result);
        });
    });
});


var server = app.listen(6666, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('6666');
});

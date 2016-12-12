var express = require('express');
var app = express();
app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/api', function(req, res){
    var result = getResult(req.query)
    res.send(result);
});

var server = app.listen(8888, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('8888 port is running!');
});


function getResult(query){
    var result = [];

    for(var i = 0; i < parseInt(query.count); ++i){
        var item = {
            'title': '标题 ' +  query.type + ' - ' + i,
            'text': new Date()
        }
        result.push(item);
    }
    return result;
}

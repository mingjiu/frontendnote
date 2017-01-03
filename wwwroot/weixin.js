var express = require('express');
var app = express();
var sha1 = require('sha1');
var config = require('./module/config');
var at = new require('./module/getAccessToken')();
var wechat = require('./module/node-wechat')('mmj');
app.use(express.static('static'));

app.get('/hello', function (req, res) {
  res.send("hello, I am MJ. Welcome to my blog.");
});

app.get('/', function (req, res){
	res.sendFile(__dirname + "/static/" + "index.html");
});

app.get('/vicky', function (req, res){
	res.sendFile(__dirname + "/static/vicky/" + "vicky.html");
});

app.get('/form_wx', function(req, res){
    // var mysignature =  sortDictStr(req.query);
    // if(mysignature === req.query.signature){
    //     res.send(req.query.echostr);
    // }else{
    //     res.send('error');
    // }
    wechat.checkSignature(req, res);
});
app.post('/form_wx', function(req, res){

    wechat.handler(req, res);

    wechat.text(function (data) {

      console.log(data);
      var msg = {
        FromUserName : data.ToUserName,
        ToUserName : data.FromUserName,
        MsgType : "text",
        Content: '回复测试'
      }

      //回复信息
      wechat.send(msg);
    });
    wechat.event(function (data) {
      var msg = {
        FromUserName : data.ToUserName,
        ToUserName : data.FromUserName,
        //MsgType : "text",
        // Content : (data.Event == "subscribe") ? "欢迎订阅" : "欢迎再次订阅"
        Content: data.EventKey ? data.EventKey: '欢迎关注'
      }
      wechat.send(msg);
    });

    // parseString(req.body, function(err, result){
    //     var text = '<xml>'+
    //         '<ToUserName><![CDATA['+result.FromUserName+']]></ToUserName>'+
    //         '<FromUserName><![CDATA['+result.toUser+']]></FromUserName>'+
    //         '<CreateTime>'+Date.parse(new Date())+'</CreateTime>'+
    //         '<MsgType><![CDATA[text]]></MsgType>'+
    //         '<Content><![CDATA['+JSON.stringify(result)+']]></Content>'+
    //         '</xml>';
    //         res.send(text);
    // });
});

app.listen(process.env.PORT || 5050);

function sortDictStr(query) {
    var str = [config.TOKEN, query.timestamp, query.nonce].sort();
    var result = '';
    for(var i = 0; i< str.length; i++){
        result = result + str[i];
    }
    return sha1(result);
}

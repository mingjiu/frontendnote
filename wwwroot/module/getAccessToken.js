var https = require('https');
var config = require('./config');

function AccessToken(){

    var at = {
        access_token: null,
        expires_in: 0
    };

    function setAT(cb){
        https.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+config.appid+'&secret='+config.appsecret, function(res,data, b){
            res.on('data', function(data){
                data = JSON.parse(data.toString());
                at = {
                    access_token: data['access_token'],
                    expires_in: 7000*1000 + Date.parse(new Date())
                }
                console.log(at);
            });
        });
    }

    this.getAT = function(){
        if( Date.parse(new Date()) > parseInt(at.expires_in)){
            return at.access_token;
        }else{
            setAT(this.getAT());
        }
    }
    setAT();
}
module.exports = AccessToken;

var config = require('./config');
var https = require('https');
var qs = require('querystring')

function createQRCode(info, at){
    var data = {
        "action_name": "QR_LIMIT_STR_SCENE",
        "action_info": {
            "scene": {
                "scene_str": info
            }
        }
    };
    var opt = {
        host: 'api.weixin.qq.com',
        // path: '/cgi-bin/qrcode/create?access_token=03al90AnyLcUJvPRbA93tmjR6OqiJ-CVd6os57eEevPdh6URpgZnkDAE84-DzY6r86qB_eO9pb7G_8QQnYhfg9ou5vCE5dB89chB3lz4btkFf4S6kQk1_UrMetv08Ga4GTLcAEAUHZ',
        path: '/cgi-bin/qrcode/create?access_token=' + at
        method: 'POST',
        headers: {
            "Content-Type": 'application/json;encoding=utf-8',
            'Content-Length': JSON.stringify(data).length
        }
    };
    var req = https.request(opt, function(res){
        res.on('data', function(data){
            console.log(data.toString());
        });
    });
    req.on('error', function(err){
        console.log(err);
    });
    req.write(JSON.stringify(data));
    req.end();
}
// createQRCode('dingcaiyi');

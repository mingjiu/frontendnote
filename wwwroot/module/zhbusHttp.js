var querystring = require('querystring');
var http = require('http');
var _ = require('underscore');

var zhbusHttp = {
    get: function(param, callback){
        var result = {
            code: null,
            status: null,
            data: '',
            desc: null
        };
        if(checkParam(param.api.param, param.data)){
            var url = param.api.url + querystring.stringify(param.data);
            console.log(url)
            http.get(url, function(res){
                res.on('data', function(data){
                    result.data = result.data + data;
                });
                res.on('end',function(){
                    result.code = 0;
                    result.status = 'success';
                    result.desc = 'success';
                    result.data = result.data.toString('utf-8');
                    callback(result);
                });
            }).on('error', function(e){
                result.code = -1;
                result.status = 'error';
                result.desc = 'error';
                result.data = e.message;
                callback(result);
            });
        } else {
            result.code = 1;
            result.status = 'error';
            result.desc = 'param error';
            callback(result);
        }

    },
    post: function(param, callback){

    }
}

function checkParam(param, data){
    var temp = [];
    for(var i in param){
        for(var key in data){
            temp[i] = (param[i] == key ? true : false);
            if(param[i] == key){
                temp[i] = true;
                break;
            }else{
                temp[i] = false;
            }
        }
    }
    console.log(temp)
    var result = true;

    for(var i in temp){
        result = result && temp[i]
    }
    console.info(result)
    return result;
}

module.exports = zhbusHttp;

/**
 * Created by gbox3d on 2013. 12. 27..
 */

var http = require('http');
var gPort = 8080;
var UrlParser = require('url');

http.createServer(function (req, res) {

    try {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        console.log('remote address:' + ip);

    }
    catch(e)
    {
        console.log(e);

    }

    //console.log(req);

    if(req.method == 'GET') {
        if(req.url != '/favicon.ico') {

            //쿼리인자를 쓰기좋게 json으로 파싱한다.
            //쿼리인자들은 json형식으로 된 result.query로 접근할수있다.
            var result = UrlParser.parse(req.url,true);
            console.log(result);

            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Max-Age': '1000'
            });

            res.write(JSON.stringify(result.query));
            res.end();
        }
        else {
            res.writeHead(404);
            res.end();
        }

    }
    else if(req.method == 'POST') {

        var body_data = '';

        //포스트는 데이터가 조각조각 들어 온다.
        req.on('data',function(data) {
            body_data += data;
        });

        //데이터를 다 받았으면
        req.on('end', function () {
            res.writeHead(200, {
                //'Content-Type': 'text/plain',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Max-Age': '1000'
            });

            var result = UrlParser.parse(body_data,true);
            console.log(result);

            res.write(body_data);

            res.end();

        });

    }
    else {

        console.log('unkown  method : ' + req.method );

    }


}).listen(gPort);


console.log('Server running at : ' + gPort);
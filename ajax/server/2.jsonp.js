/**
 * Created by gbox3d on 2013. 12. 27..
 */

var http = require('http');
var UrlParser = require('url');

http.createServer(function (req, res) {

    console.log('request received');

    var result = UrlParser.parse(req.url,true);

    console.log(result);

    res.writeHead(200, {'Content-Type': 'application/jsonp'});
    res.end(
        result.query.callback
            + '({"something": "rather", "more": "pork", "tua": "tara",'
            + '"echo":"' + result.query.somedata  + '" });');

}).listen(8081);

console.log('jsop http server exam..at port 8081');
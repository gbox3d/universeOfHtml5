/**
 * Created by gunpower on 2016. 1. 14..
 */

var xhr = require("xhr")

xhr({
    body: "test",
    uri: "http://www.mocky.io/v2/55a02cb72651260b1a94f024",
    headers: {
        "Content-Type": "application/json"
    }
}, function (err, resp, body) {
    // check resp.statusCode
})
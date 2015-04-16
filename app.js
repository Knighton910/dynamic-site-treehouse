


var router = require('./router.js');
var http = require('http');
http.createServer(function (req, res) {
    router.home(req, res);
    router.user(req, res);
}).listen(8080);
console.log('Server running @ localhost:8080');
//4. function that handles the reading of file
//1. Create a web server
//Problem: we need a simple way to look at a user's badge count and jS
//
//Solution: Use nodejs to perform the profile.




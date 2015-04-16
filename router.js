//  Build a simple dynamic site with node.js  via teamtreehouse.

var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require('querystring');

var commonHeaders = {'Content-Type': 'text/html'};



function home(req ,res){
    if(req.url === "/") {
        if(req.method.toLocaleLowerCase() === 'get') {
            //show search
            res.writeHead(200, commonHeaders);
            renderer.view('header', {}, res);
            renderer.view('search', {}, res);
            renderer.view('footer', {}, res);
            res.end();
        }else {
            // if url === '/' && post

            //get the post data from body
            req.on('data', function(postBody){
                //extract the username
                var query = querystring.parse(postBody.toString());
                res.writeHead(303, {'Location': '/' + query.username });
                res.end();
                //redirect to /username.
            })

        }
    }
}
//3. handle http route Get /:username
function user(req, res) {                              //  entering the forest.
    var username = req.url.replace('/', '');
    if (username.length > 0) {
        res.writeHead(200, commonHeaders);
        renderer.view('header', {}, res);

        var studentProfile = new Profile(username);

        studentProfile.on('end', function(profileJSON){
            //show profile

            //store vals
            var values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profile.JSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            };
            //simple response
           renderer.view('profile', values, res);
           renderer.view('footer', {}, res);
            res.end();
        });

        studentProfile.on("error", function(error){
           // show error
            renderer.view('error', {errorMessage: error.message}, res);
            renderer.view('search', {}, res);
            renderer.view('footer', {}, res);
            res.end();
        });

    }
}                                              //  exiting the forest.


module.exports.home = home;
module.exports.user = user;










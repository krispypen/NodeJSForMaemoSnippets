/**
* Socket.IO server (single process only)
*/


var http = require('http');
var fs = require('fs');
var path = require('path');
 
var server = http.createServer(function (request, response) {
 
    console.log("LOG: requesting: '" + request.url +"'");
     
    var filePath = '.' + request.url;

    if (filePath == './')
        filePath = './index.html';


    console.log("LOG: looking for file '" + filePath +"'");

         
    var extname = path.extname(filePath);
    var contentType = 'text/html';

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
    }
     
    path.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
	    response.write("Page '"+ request.url + "' can't be shown");
            response.end();
        }
    });
     
});

 



var io = require('socket.io').listen(server);

server.listen(9002);

io.set('transports');

// log level 0 or 1 : info output
// 2: debug output
io.set( 'log level', 2 );



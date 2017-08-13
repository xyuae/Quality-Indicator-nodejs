var http = require('http');
var myServer = http.createServer(function(req, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write('Hello');
	response.end();
});  //create a server

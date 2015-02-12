var connect = require('connect');
var serveStatic = require('serve-static');
var fs = require('fs');

var port = process.env.PORT || 8080;
var app = connect();

function serveTextFile(filepath, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  var file = fs.createReadStream(filepath);
  file.pipe(response);
}


function servePuppyHoff(request, response, next) {
  if (/^mac\./.test(request.headers.host) && request.url === '/') {
    serveTextFile(__dirname + '/puppyhoff.sh', response);
  } else if (/^hannah\./.test(request.headers.host) && request.url === '/') {
    serveTextFile(__dirname + '/cutehoff.sh', response);
  } else {
    next();
  }
}

app.use(servePuppyHoff);
app.use(serveStatic(__dirname + '/public'));
app.listen(port);

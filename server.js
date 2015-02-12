var connect = require('connect');
var serveStatic = require('serve-static');
var fs = require('fs');

var port = process.env.PORT || 8080;
var app = connect();

function servePuppyHoff(request, response, next) {
  if (/^mac\./.test(request.headers.host) && request.url === '/') {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    var script = fs.createReadStream(__dirname + '/puppyhoff.sh');
    script.pipe(response);
    return;
  }
  next();
}

app.use(servePuppyHoff);
app.use(serveStatic(__dirname + '/public'));
app.listen(port);

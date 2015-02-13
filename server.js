var connect = require('connect');
var serveStatic = require('serve-static');
var fs = require('fs');

var port = process.env.PORT || 8080;
var app = connect();

var puppyhoffers = {
  mac: "mac.sh",
  hannah: "hannah.sh",
  gnome: "gnome.sh"
};

function serveTextFile(filepath, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  var file = fs.createReadStream(filepath);
  file.pipe(response);
}

function servePuppyHoff(request, response, next) {
  var subdomain = request.headers.host.split('.')[0];
  var ph = puppyhoffers[subdomain];
  if (ph) {
    serveTextFile(__dirname + '/puppyhoffers/' + ph, response);
    return;
  }
  next();
}

app.use(servePuppyHoff);
app.use(serveStatic(__dirname + '/public'));
app.listen(port);

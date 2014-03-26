var express = require('express'),
    http = require('http'),
    path = require('path');

var port = process.env.PORT || 3000;

var app = express();
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('index', { livereload: true });
});

app.use(express.static(__dirname));

var server = http.createServer(app).listen(port);

console.log('Express app started on port ' + port);
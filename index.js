var express = require('./node_modules/express/index');
var fs = require('fs')
var https = require('https')

var app = express();
var cors= require('cors');
//var cookieParser = require('./node_modules/cookie-parser');
var path = require('path');

app.use(cors());
//app.use(cookieParser());

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('/lib',express.static(__dirname + '/lib'));
app.use('/view/immagini',express.static(__dirname + '/lib'));
//app.use('/Frontend',express.static(__dirname + '/Frontend'));

/*
Routing corrispondente alle richieste del client.
*/
app.get('/', function(req, res){
  res.sendFile(__dirname + '/view/Index.html');
});

app.get('/login.html', function(req, res){
  res.sendFile(__dirname + '/login.html');
});

app.get('/controller/*', function(req, res){
	//console.log("HEADER: "+req.get("Origin"));
  var backendjs = require('.'+req.url.split("?")[0]+".js"); //+".js"
  var result = backendjs.main(res,req,function(result){ 
    //console.log(result);
    res.send(result)});
});

app.get('/view/*', function(req, res){
  var frontend='.'+req.url.split("?")[0];
	res.sendFile(__dirname + '/'+frontend);
});

https.createServer({
  key: fs.readFileSync('./sslcert/server.key'),
  cert: fs.readFileSync('./sslcert/server.cert')
}, app)
.listen(8080, function () {
  console.log('Example app listening on port 8080 Go to https://localhost:8080/')
})

/*if(process.env.NODE_ENV !== 'production') {
  process.once('uncaughtException', function(err) {
    console.error('FATAL: Uncaught exception.');
    console.error(err.stack||err);
    setTimeout(function(){
      process.exit(1);
    }, 100);
  });
}*/




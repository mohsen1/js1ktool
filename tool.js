var
  express = require('express'),
  asciimo = require('asciimo'),
  colors  = require('colors');


var 
  server = express();


server.get('/', function(req, res){

  res.send('shim.html');
});

server.listen(1024);


console.log("Server is running. Go to localhost:1024")
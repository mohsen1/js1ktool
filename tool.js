var
  sys = require('sys'), 
  express = require('express'),
  asciimo = require('asciimo').Figlet,
  fs = require('fs'),
  compressor = require('node-minify'),
  colors = require('colors');


var 
  server = express();


function readFileError(err, res){
  res.send("Error reading file!");
  console.error(err);
}

function minify(){
  function callback (func){
    if (typeof func === 'function') func();
  }
  new compressor.minify({
    type: 'uglifyjs',
    fileIn: 'js1k.js',
    fileOut: 'js1k-min.js',
    callback: callback
  });
  return {then: callback}
}

server.get('/', function(req, res){
  fs.readFile('./shim.html', 'utf8', function (err,shim) {
    if (err) {readFileError(err, res);}
    minify().then(function(err){
      if(err){readFileError(err, res);}
      fs.readFile('./js1k-min.js', 'utf8', function (err,js1k) {
        if (err) {readFileError(err, res);}
        shim = shim.replace('SCRIPT', js1k);
        var length = js1k.length;
        asciimo.write(length+' Bytes', 'banner', function(art){
          if (length<1024){
            sys.puts(art.green);
          }else {
            sys.puts(art.red);
          }
        });
        res.send(shim);
      });
    })
  });
});

var port = 1024;
server.listen(port);


console.log("Server is running. Go to localhost:"+port)
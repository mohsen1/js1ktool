var
  sys = require('sys'), 
  express = require('express'),
  asciimo = require('asciimo').Figlet,
  fs = require('fs'),
  watch = require('node-watch'),
  compressor = require('node-minify'),
  colors = require('colors'), 
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);

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

function puts(length) {
  asciimo.write(length+' Bytes', 'banner', function(art){
    if (length<1024){
      sys.puts(art.green);
    }else {
      sys.puts(art.red);
    }
  });
}

function reload(){
  io.sockets.emit("reload");
}

app.get('/shim', function(req, res){
  fs.readFile('./shim.html', 'utf8', function (err,shim) {
    if (err) {readFileError(err, res);}
    minify().then(function(err){
      if(err){readFileError(err, res);}
      fs.readFile('./js1k-min.js', 'utf8', function (err,js1k) {
        if (err) {readFileError(err, res);}
        shim = shim.replace('SCRIPT', js1k);
        puts(js1k.length);
        res.send(shim);
        reload();
      });
    })
  });
});

app.get('/', function(req, res){
  fs.readFile('index.html', 'utf8', function(err, index){
    if (err) {readFileError(err, res);}
    res.send(index);
  })
});


watch('js1k.js', function (file) {
  console.warn(file);
  minify()
  reload();
});  


fs.readFile('./js1k-min.js', 'utf8', function (err,js1k) {
  if(!err){
    puts(js1k.length);
  }
});

var port = 1024 || process.env.PORT;
server.listen(port);

console.log("Server is running. Go to localhost:"+port)
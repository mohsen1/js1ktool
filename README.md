JS1K Tool
=========

JS1K Tool is a tool for creating JavaScript applications in 
[JS1K](http://js1k.com/) provided [shim](http://js1k.com/2013-spring/shim.html)
and contentiously minifying and monitoring changes via Node.js.

How to use it
------------

``` Bash
git clone git@github.com:mohsen1/js1ktool.git
npm install
npm start
```

Open `localhost:1024` in the browser 

start editing `js1k.js` and see the length of minified version in console. 


TODOs
-----

JS1K tool will live reload the browser on edits via WebSockets script

JS1K Tool
=========

JS1K Tool is a tool for creating JavaScript applications for 
[JS1K](http://js1k.com/) competition with provided [shim](http://js1k.com/2013-spring/shim.html) from JS1K team. 
It is monitoring changes in your JavaScript application via Node.js, minify it, put it in shim, print minifed version
s length and reload the browser. It will print length of minified code
in console with a giant font using [asciimo](https://github.com/Marak/asciimo).
JS1K tool will live reload the browser on edits via injected script in the shim and [socket.io](socket.io)

How to use it
------------

``` Bash
git clone git@github.com:mohsen1/js1ktool.git
npm install
touch js1k.js 
npm start
```

Open `localhost:1024` in the browser 

Start editing `js1k.js` and see the length of minified version in console. 

![console](http://i.imgur.com/ImvIo5y.png)

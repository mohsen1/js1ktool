
Number.prototype.pow = function(n){return Math.pow(this,n)}

function C(u){
  return document.createElement(u)
}

z = 50;
d = C('div')
i = C('input')
zin = C('button')
zou = C('button')
zin.innerHTML = '+'
zou.innerHTML = '-'
i.value = 'x*sin(x^2)'//'50*sin(x/50)'
d.innerHTML = 'f(x)='
d.appendChild(i)
b.appendChild(d)
b.appendChild(zin)
b.appendChild(zou);


i.onkeyup = p
zin.onclick = function(){z+=5; p()}
zou.onclick = function(){z-=5; p()}



c.onmousedown = function(e){
  orgX = e.pageX - dx;
  orgY = e.pageY - dy;
  c.onmousemove = mmeh
}
b.onmouseup = function(e){
  c.onmousemove = 0
}

dx = 0;
dy = 0;

function mmeh(e){ // mouse move event handler
  dx = e.pageX - orgX
  dy = e.pageY - orgY
  p()
}

function o(f){
  W = c.width = c.height = 500
  w = h = W/2;

  w += dx
  h += dy

  //draw mesh
  a.strokeStyle = '#EFF'
  a.beginPath()
  for(x=1; x<W; x+=10){
    a.moveTo(x,0)
    a.lineTo(x,W)
    a.moveTo(0,x)
    a.lineTo(W,x)
  }
  a.stroke()



  a.strokeStyle = 'black'
  a.beginPath()
  a.moveTo(0, h)
  a.lineTo(W, h)
  a.moveTo(w,0)
  a.lineTo(w,W)
  a.stroke()

  a.strokeStyle = 'red'
  a.beginPath()

  for(x=-w; x++<W*10;){
    a.lineTo(x+w,z*f(x/z)+h)
  }

  a.stroke()
}



function p(){
    try{
      o(new Function('x', 'return ' + 
        i.value
        .replace(/[\d|\d.\d]+|x/g, function(n){
          return '(' + n + ')'
        })
        .replace(/sin|cos|tan|cot/g, function(n){
          return 'Math.' + n
        })
        .replace(/\^/g, '.pow')
      ))
    }catch(e){
    }
}
p()

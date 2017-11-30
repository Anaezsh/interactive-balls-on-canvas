var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var balls = [];
var colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
var add = document.getElementById("add");
var remove = document.getElementById("remove");
var clear = document.getElementById("clear");
context.globalAlpha = 0.85;
context.strokeStyle = "black";
context.lineWidth = 2;

var mouse = {
  x: 0,
  y: 0,
  down: false
};

var selected;

canvas.onmousemove = function(e) {
  mouse.x = e.pageX - canvas.offsetLeft;
  mouse.y = e.pageY - canvas.offsetTop;
};

canvas.onmousedown = function() {
  mouse.down = true;
};

canvas.onmouseup = function() {
  mouse.down = false;
  selected = undefined;
};

add.onclick = function() {;
  var x = Math.floor(Math.random()*canvas.width);
  var y = Math.floor(Math.random()*canvas.height);
  var radius = Math.floor(Math.random()*40 + 10);
  var ind = Math.floor(Math.random()*colors.length);
  balls.push(new Ball(x,y,radius,colors[ind]));
};

remove.onclick = function() {
  balls.pop();
};

clear.onclick = function() {
  balls = [];
};

function Ball(x,y,r,c) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = c;
}

Ball.prototype.draw = function() {
  context.beginPath();
  context.arc(this.x,this.y,this.r,0,2*Math.PI);
  context.fillStyle = this.color;
  context.fill();
};

Ball.prototype.stroke = function() {
  context.beginPath();
  context.arc(this.x,this.y,this.r,0,2*Math.PI);
  context.stroke();
}

function setSelected() {
  for(var i=balls.length-1; i>-1; i--) {
    if(mouse.x>balls[i].x-balls[i].r && mouse.x<balls[i].x+balls[i].r && mouse.y>balls[i].y-balls[i].r && mouse.y<balls[i].y+balls[i].r) {
      balls[i].stroke();
      selected = balls[i];
      return;
    }
  }
}

function render() {
  context.clearRect(0,0,canvas.width,canvas.height);
  if(balls[0]) {
    for(var i=0; i<balls.length; i++) {
      balls[i].draw();
    }
    setSelected();
    if(selected && mouse.down) {
      selected.x = mouse.x;
      selected.y = mouse.y;
    }
  }
  requestAnimationFrame(render);
}

render();

const canvas=document.getElementById("game"),ctx=canvas.getContext("2d");
const brickRows=5,brickCols=8,brickW=50,brickH=20,brickPad=8,brickTop=25,brickLeft=25;
let bricks=[];
for(let r=0;r<brickRows;r++){bricks[r]=[];for(let c=0;c<brickCols;c++)bricks[r][c]={x:0,y:0,status:1};}
const paddle={w:85,h:10,x:canvas.width/2-42.5};
const ball={x:canvas.width/2,y:canvas.height-30,r:8,dx:3.5,dy:-3.5};
let score=0;
function drawBricks(){
  for(let r=0;r<brickRows;r++)for(let c=0;c<brickCols;c++){
    if(bricks[r][c].status){
      const bx=c*(brickW+brickPad)+brickLeft, by=r*(brickH+brickPad)+brickTop;
      bricks[r][c].x=bx; bricks[r][c].y=by;
      ctx.fillStyle="#e94560"; ctx.fillRect(bx,by,brickW,brickH);
    }
  }
}
function drawPaddle(){ctx.fillStyle="#fff";ctx.fillRect(paddle.x,canvas.height-paddle.h-10,paddle.w,paddle.h);}
function drawBall(){ctx.beginPath();ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);ctx.fillStyle="#f9ed69";ctx.fill();ctx.closePath();}
function update(){
  ball.x+=ball.dx; ball.y+=ball.dy;
  if(ball.x<ball.r||ball.x>canvas.width-ball.r) ball.dx=-ball.dx;
  if(ball.y<ball.r) ball.dy=-ball.dy;
  else if(ball.y>canvas.height-ball.r){
    if(ball.x>paddle.x && ball.x<paddle.x+paddle.w){ ball.dy=-ball.dy; }
    else { document.location.reload(); }
  }
  for(let r=0;r<brickRows;r++)for(let c=0;c<brickCols;c++){
    const b=bricks[r][c];
    if(b.status && ball.x>b.x && ball.x<b.x+brickW && ball.y>b.y && ball.y<b.y+brickH){ ball.dy=-ball.dy; b.status=0; score++; document.getElementById("score").textContent=score; }
  }
}
canvas.addEventListener("mousemove",e=>{const r=canvas.getBoundingClientRect();paddle.x=e.clientX-r.left-paddle.w/2;if(paddle.x<0)paddle.x=0;if(paddle.x+paddle.w>canvas.width)paddle.x=canvas.width-paddle.w;});
function loop(){ctx.clearRect(0,0,canvas.width,canvas.height);drawBricks();drawPaddle();drawBall();update();requestAnimationFrame(loop);}
loop();

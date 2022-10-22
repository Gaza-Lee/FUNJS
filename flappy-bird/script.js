const canvas=document.getElementById("game"),ctx=canvas.getContext("2d");
const bird={x:50,y:150,r:12,vy:0};
const gravity=0.45,jump=-8.5;
const pipes=[];let frame=0,score=0,alive=true;
let best=parseInt(localStorage.getItem("flappyBest")||"0",10);
function addPipe(){pipes.push({x:canvas.width,gapY:100+Math.random()*200,gap:130,passed:false});}
function reset(){bird.y=150;bird.vy=0;pipes.length=0;frame=0;score=0;alive=true;document.getElementById("score").textContent=0;}
function update(){
  if(!alive) return;
  bird.vy+=gravity; bird.y+=bird.vy;
  if(bird.y+bird.r>canvas.height||bird.y-bird.r<0){alive=false;}
  if(frame%90===0) addPipe();
  for(let i=pipes.length-1;i>=0;i--){
    const p=pipes[i]; p.x-=2;
    if(!p.passed && p.x+30<bird.x){p.passed=true;score++;document.getElementById("score").textContent=score;if(score>best){best=score;localStorage.setItem("flappyBest",best);document.getElementById("best").textContent=best;}}
    if(p.x+30<0) pipes.splice(i,1);
    if(bird.x+bird.r>p.x && bird.x-bird.r<p.x+30 && (bird.y-bird.r<p.gapY || bird.y+bird.r>p.gapY+p.gap)){alive=false;}
  }
  frame++;
}
function draw(){
  ctx.fillStyle="#70c5ce";ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#ded895";ctx.fillRect(0,canvas.height-40,canvas.width,40);
  ctx.fillStyle="#228B22";
  pipes.forEach(p=>{ctx.fillRect(p.x,0,30,p.gapY);ctx.fillRect(p.x,p.gapY+p.gap,30,canvas.height);});
  ctx.fillStyle="#f1c40f";ctx.beginPath();ctx.arc(bird.x,bird.y,bird.r,0,Math.PI*2);ctx.fill();
  if(!alive){ctx.fillStyle="rgba(0,0,0,0.5)";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle="#fff";ctx.font="24px sans-serif";ctx.textAlign="center";ctx.fillText("Game Over",canvas.width/2,canvas.height/2);ctx.fillText("click to restart",canvas.width/2,canvas.height/2+30);}
}
canvas.addEventListener("click",()=>{if(alive)bird.vy=jump;else reset();});
document.addEventListener("keydown",e=>{if(e.code==="Space"){if(alive)bird.vy=jump;else reset();}});
setInterval(()=>{update();draw();},1000/60);
draw();

document.getElementById("best").textContent=best;

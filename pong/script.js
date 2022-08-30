const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");
const paddleH=90,paddleW=10;
let py=canvas.height/2-paddleH/2, cy=py;
let bx=canvas.width/2, by=canvas.height/2, vx=4.5, vy=3.5;
let ps=0, cs=0;

function draw(){
  ctx.fillStyle="#0b3d2e"; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#fff";
  ctx.fillRect(10,py,paddleW,paddleH);
  ctx.fillRect(canvas.width-20,cy,paddleW,paddleH);
  ctx.beginPath(); ctx.arc(bx,by,8,0,Math.PI*2); ctx.fill();
}
function update(){
  bx+=vx; by+=vy;
  if(by<8||by>canvas.height-8) vy=-vy;
  if(bx<20 && by>py && by<py+paddleH){ vx=Math.abs(vx)+0.2; }
  if(bx>canvas.width-20 && by>cy && by<cy+paddleH){ vx=-Math.abs(vx)-0.2; }
  if(bx<0){ cs++; reset(); }
  if(bx>canvas.width){ ps++; reset(); }
  if(cy+40 < by) cy+=3; else if(cy+40>by) cy-=3;
}
function reset(){ if(ps>=5||cs>=5){ alert((ps>=5?"Player":"CPU")+" wins!"); ps=0; cs=0; } bx=canvas.width/2; by=canvas.height/2; vx=(Math.random()>0.5?4:-4); vy=3; document.getElementById("p").textContent=ps; document.getElementById("c").textContent=cs; }
canvas.addEventListener("mousemove",e=>{ const r=canvas.getBoundingClientRect(); py=e.clientY-r.top-paddleH/2; if(py<0)py=0; if(py>canvas.height-paddleH)py=canvas.height-paddleH; });
setInterval(()=>{ update(); draw(); },1000/60);
draw();

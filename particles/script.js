const canvas=document.getElementById("c");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;canvas.height=window.innerHeight;
const pts=[];
for(let i=0;i<150;i++)pts.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-0.5)*1.5,vy:(Math.random()-0.5)*1.5,r:Math.random()*2+1});
let mouse={x:canvas.width/2,y:canvas.height/2};
canvas.addEventListener("mousemove",e=>{mouse.x=e.clientX;mouse.y=e.clientY;});
function update(){
  ctx.fillStyle="rgba(10,10,10,0.2)";ctx.fillRect(0,0,canvas.width,canvas.height);
  pts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>canvas.width)p.vx*=-1;
    if(p.y<0||p.y>canvas.height)p.vy*=-1;
    const dx=mouse.x-p.x,dy=mouse.y-p.y;const d=Math.hypot(dx,dy);
    if(d<120){p.vx+=dx/d*0.05;p.vy+=dy/d*0.05;}
    ctx.fillStyle="#00bcd4";ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
  });
  requestAnimationFrame(update);
}
update();

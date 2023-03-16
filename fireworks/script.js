const canvas=document.getElementById("c");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;canvas.height=window.innerHeight;
const particles=[];
function boom(x,y){
  for(let i=0;i<100;i++){
    const a=Math.random()*Math.PI*2;const s=Math.random()*5+2;
    particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:60,color:`hsl(${Math.random()*360},100%,60%)`});
  }
}
canvas.addEventListener("click",e=>boom(e.clientX,e.clientY));
function update(){
  ctx.fillStyle="rgba(0,0,0,0.15)";ctx.fillRect(0,0,canvas.width,canvas.height);
  for(let i=particles.length-1;i>=0;i--){
    const p=particles[i];p.x+=p.vx;p.y+=p.vy;p.vy+=0.08;p.life--;
    ctx.fillStyle=p.color;ctx.globalAlpha=p.life/60;
    ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill();
    if(p.life<=0)particles.splice(i,1);
  }
  ctx.globalAlpha=1;
}
setInterval(update,16);
setInterval(()=>boom(Math.random()*canvas.width,Math.random()*canvas.height/2),1200);

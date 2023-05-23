const canvas=document.getElementById("c");
const ctx=canvas.getContext("2d");
const cx=canvas.width/2,cy=canvas.height/2,r=125;
function draw(){
  const now=new Date();
  const s=now.getSeconds(),m=now.getMinutes(),h=now.getHours()%12;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle="#f9f9f9";ctx.fill();ctx.strokeStyle="#333";ctx.lineWidth=4;ctx.stroke();
  ctx.fillStyle="#333";ctx.font="16px sans-serif";ctx.textAlign="center";ctx.textBaseline="middle";
  for(let i=1;i<=12;i++){const a=i*Math.PI/6-Math.PI/2;ctx.fillText(i,cx+Math.cos(a)*(r-25),cy+Math.sin(a)*(r-25));}
  function hand(angle,length,width,color){ctx.beginPath();ctx.lineWidth=width;ctx.lineCap="round";ctx.strokeStyle=color;ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(angle)*length,cy+Math.sin(angle)*length);ctx.stroke();}
  hand((h+m/60)*Math.PI/6-Math.PI/2,60,6,"#333");
  hand(m*Math.PI/30-Math.PI/2,90,4,"#333");
  hand(s*Math.PI/30-Math.PI/2,100,2,"#e74c3c");
  ctx.beginPath();ctx.arc(cx,cy,6,0,Math.PI*2);ctx.fillStyle="#333";ctx.fill();
}
setInterval(draw,1000);draw();

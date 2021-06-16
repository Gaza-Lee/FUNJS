const canvas=document.getElementById("c");
const ctx=canvas.getContext("2d");
let drawing=false,color="black";
ctx.lineWidth=3;ctx.lineCap="round";
canvas.addEventListener("mousedown",e=>{drawing=true;ctx.beginPath();ctx.moveTo(e.offsetX,e.offsetY);});
canvas.addEventListener("mousemove",e=>{if(!drawing)return;ctx.strokeStyle=color;ctx.lineTo(e.offsetX,e.offsetY);ctx.stroke();});
canvas.addEventListener("mouseup",()=>drawing=false);
canvas.addEventListener("mouseleave",()=>drawing=false);
function setColor(c){color=c;}
function clearCanvas(){ctx.clearRect(0,0,canvas.width,canvas.height);}

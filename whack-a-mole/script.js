const grid=document.getElementById("grid");
const scoreEl=document.getElementById("score");
const timeEl=document.getElementById("time");
let score=0,time=50;
for(let i=0;i<9;i++){const h=document.createElement("div");h.className="hole";const m=document.createElement("div");m.className="mole";h.appendChild(m);h.onclick=()=>{if(h.classList.contains("up")){score++;scoreEl.textContent=score;h.classList.remove("up");}};grid.appendChild(h);}
const holes=Array.from(document.querySelectorAll(".hole"));
function pop(){const h=holes[Math.floor(Math.random()*holes.length)];h.classList.add("up");setTimeout(()=>h.classList.remove("up"),700);}
const popInterval=setInterval(pop,800);
const timer=setInterval(()=>{time--;timeEl.textContent=time;if(time<=0){clearInterval(timer);clearInterval(popInterval);alert("Time up! Score: "+score);}},1000);

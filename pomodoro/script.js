const timerEl=document.getElementById("timer");
let time=30*60,interval=null;
function update(){const m=Math.floor(time/60),s=time%60;timerEl.textContent=`${m}:${s.toString().padStart(2,"0")}`;}
function start(){if(interval)return;interval=setInterval(()=>{time--;update();if(time<=0){clearInterval(interval);interval=null;alert("Done!");}},1000);}
function reset(){clearInterval(interval);interval=null;time=25*60;update();}
update();

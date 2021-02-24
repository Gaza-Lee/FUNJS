const pads=document.getElementById("pads");
const colors=["g","r","b","y"];
let seq=[],player=[],level=0,playing=false;
colors.forEach(c=>{const d=document.createElement("div");d.className=c;d.onclick=()=>press(c);pads.appendChild(d);});
function start(){seq=[];player=[];level=0;next();}
function next(){player=[];level++;document.getElementById("status").textContent="Level "+level;seq.push(colors[Math.floor(Math.random()*4)]);playSeq();}
function playSeq(){playing=true;let i=0;const iv=setInterval(()=>{flash(seq[i]);i++;if(i>=seq.length){clearInterval(iv);playing=false;}},700);}
function flash(c){const el=pads.querySelector("."+c);el.style.opacity=1;setTimeout(()=>el.style.opacity=.7,300);}
function press(c){if(playing)return;flash(c);player.push(c);const idx=player.length-1;if(player[idx]!==seq[idx]){document.getElementById("status").textContent="Wrong! Game over";playing=true;return;}if(player.length===seq.length)setTimeout(next,600);}

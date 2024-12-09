const el=document.getElementById("text");
const phrases=["Hello, world!","I build small things with JS.","Fun projects live here.","Type, delete, repeat."];
let pi=0,ci=0,deleting=false;
function tick(){
  const phrase=phrases[pi];
  if(!deleting){el.textContent=phrase.slice(0,ci+1);ci++;if(ci===phrase.length){deleting=true;setTimeout(tick,1200);return;}}
  else{el.textContent=phrase.slice(0,ci-1);ci--;if(ci===0){deleting=false;pi=(pi+1)%phrases.length;}}
  setTimeout(tick,deleting?45:80);
}
tick();

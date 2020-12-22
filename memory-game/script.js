const board=document.getElementById("board");
const movesEl=document.getElementById("moves");
const icons=["A","B","C","D","E","F","G","H"];
let cards=[],flipped=[],matched=0,moves=0,lock=false;
function init(){
  cards=[...icons,...icons].sort(()=>Math.random()-0.5);
  board.innerHTML="";flipped=[];matched=0;moves=0;movesEl.textContent=0;
  cards.forEach((ic,i)=>{
    const d=document.createElement("div");d.className="card";d.dataset.i=i;
    d.onclick=()=>flip(i,d,ic);board.appendChild(d);
  });
}
function flip(i,d,ic){
  if(lock||d.classList.contains("flipped"))return;
  d.textContent=ic;d.classList.add("flipped");flipped.push({i,d,ic});
  if(flipped.length===2){
    moves++;movesEl.textContent=moves;lock=true;
    const [a,b]=flipped;
    if(a.ic===b.ic){matched+=2;flipped=[];lock=false;if(matched===cards.length)setTimeout(()=>alert("You win!"),200);}
    else setTimeout(()=>{a.d.textContent="";b.d.textContent="";a.d.classList.remove("flipped");b.d.classList.remove("flipped");flipped=[];lock=false;},800);
  }
}
init();

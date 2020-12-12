const board=document.getElementById("board");
const status=document.getElementById("status");
let cells=Array(9).fill(""),turn="X",over=false;
function render(){board.innerHTML="";cells.forEach((v,i)=>{const b=document.createElement("button");b.textContent=v;b.onclick=()=>play(i);board.appendChild(b);});status.textContent=over?"":turn+"'s turn";}
function play(i){if(over||cells[i])return;cells[i]=turn;if(win(turn)){status.textContent=turn+" wins!";over=true;render();return;}if(cells.every(c=>c)){status.textContent="Draw!";over=true;render();return;}turn=turn==="X"?"O":"X";render();}
function win(p){const w=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];return w.some(t=>t.every(i=>cells[i]===p));}
function reset(){cells=Array(9).fill("");turn="X";over=false;render();}
render();

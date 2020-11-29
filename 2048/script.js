const grid=document.getElementById("grid");
const scoreEl=document.getElementById("score");
let board=[],score=0;
function init(){board=Array.from({length:4},()=>Array(4).fill(0));score=0;addTile();addTile();render();}
function addTile(){const empty=[];for(let r=0;r<4;r++)for(let c=0;c<4;c++)if(!board[r][c])empty.push({r,c});if(!empty.length)return;const {r,c}=empty[Math.floor(Math.random()*empty.length)];board[r][c]=Math.random()<0.9?2:4;}
function render(){grid.innerHTML="";for(let r=0;r<4;r++)for(let c=0;c<4;c++){const d=document.createElement("div");if(board[r][c]){d.textContent=board[r][c];d.style.background=color(board[r][c]);d.style.color=board[r][c]<=4?"#776e65":"#f9f6f2";}grid.appendChild(d);}scoreEl.textContent=score;}
function color(v){const map={2:"#eee4da",4:"#ede0c8",8:"#f2b179",16:"#f59563",32:"#f67c5f",64:"#f65e3b",128:"#edcf72",256:"#edcc61",512:"#edc850",1024:"#edc53f",2048:"#edc22e"};return map[v]||"#3c3a32";}
function slide(row){const arr=row.filter(v=>v);const merged=[];for(let i=0;i<arr.length;i++){if(arr[i]===arr[i+1]){merged.push(arr[i]*2);score+=arr[i]*2;i++;}else merged.push(arr[i]);}while(merged.length<4)merged.push(0);return merged;}
function move(dir){
  let moved=false;
  if(dir==="left"){for(let r=0;r<4;r++){const newRow=slide(board[r]);if(newRow.join()!==board[r].join())moved=true;board[r]=newRow;}}
  if(dir==="right"){for(let r=0;r<4;r++){const newRow=slide(board[r].slice().reverse()).reverse();if(newRow.join()!==board[r].join())moved=true;board[r]=newRow;}}
  if(dir==="up"){for(let c=0;c<4;c++){const col=slide([board[0][c],board[1][c],board[2][c],board[3][c]]);for(let r=0;r<4;r++){if(board[r][c]!==col[r])moved=true;board[r][c]=col[r];}}}
  if(dir==="down"){for(let c=0;c<4;c++){const col=slide([board[3][c],board[2][c],board[1][c],board[0][c]]).reverse();for(let r=0;r<4;r++){if(board[r][c]!==col[r])moved=true;board[r][c]=col[r];}}}
  if(moved){addTile();render();if(checkWin())alert("You win!");}
}
function checkWin(){return board.flat().includes(2048);}
document.addEventListener("keydown",e=>{
  if(e.key==="ArrowLeft")move("left");
  if(e.key==="ArrowRight")move("right");
  if(e.key==="ArrowUp")move("up");
  if(e.key==="ArrowDown")move("down");
});
init();

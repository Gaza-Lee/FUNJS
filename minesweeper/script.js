const board=document.getElementById("board");
const size=10,mines=12;
let grid=[],revealed=0,total=size*size-mines;
function init(){
  grid=Array.from({length:size},()=>Array(size).fill(0));
  let placed=0;
  while(placed<mines){const r=Math.floor(Math.random()*size),c=Math.floor(Math.random()*size);if(grid[r][c]!=="M"){grid[r][c]="M";placed++;}}
  for(let r=0;r<size;r++)for(let c=0;c<size;c++){
    if(grid[r][c]==="M")continue;
    let n=0;
    for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){const nr=r+dr,nc=c+dc;if(nr>=0&&nr<size&&nc>=0&&nc<size&&grid[nr][nc]==="M")n++;}
    grid[r][c]=n;
  }
  board.innerHTML="";revealed=0;
  for(let r=0;r<size;r++)for(let c=0;c<size;c++){
    const cell=document.createElement("div");cell.className="cell";cell.dataset.r=r;cell.dataset.c=c;
    cell.oncontextmenu=e=>{e.preventDefault();cell.textContent=cell.textContent==="F"?"":"F";};
    cell.onclick=()=>reveal(r,c,cell);
    board.appendChild(cell);
  }
}
function reveal(r,c,cell){
  if(cell.classList.contains("revealed"))return;
  if(grid[r][c]==="M"){cell.textContent="*";cell.style.background="#f44336";alert("Boom! Game over");return;}
  cell.classList.add("revealed");revealed++;
  if(grid[r][c]>0){cell.textContent=grid[r][c];}
  else{
    for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){
      const nr=r+dr,nc=c+dc;
      if(nr>=0&&nr<size&&nc>=0&&nc<size){
        const idx=nr*size+nc;
        const ncell=board.children[idx];
        if(!ncell.classList.contains("revealed"))reveal(nr,nc,ncell);
      }
    }
  }
  if(revealed===total)alert("You win!");
}
init();

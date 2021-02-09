let you=0,cpu=0;
const opts=["rock","paper","scissors"];
function play(choice){
  const c=opts[Math.floor(Math.random()*3)];
  let res="";
  if(choice===c)res="Draw!";
  else if((choice==="rock"&&c==="scissors")||(choice==="paper"&&c==="rock")||(choice==="scissors"&&c==="paper")){res="You win!";you++;}
  else{res="You lose!";cpu++;}
  document.getElementById("result").textContent="You: "+choice+" vs CPU: "+c+" -> "+res;
  document.getElementById("you").textContent=you;
  document.getElementById("cpu").textContent=cpu;
}

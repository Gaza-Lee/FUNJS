const display=document.getElementById("display");
const keys=document.querySelector(".keys");
const layout=["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+","C"];
let expr="";
function update(){display.textContent=expr||"0";}
layout.forEach(k=>{
  const b=document.createElement("button");
  b.textContent=k;
  if("+-*/".includes(k))b.className="op";
  if(k==="=")b.className="eq";
  b.onclick=()=>{
    if(k==="C"){expr="";update();return;}
    if(k==="="){try{expr=String(eval(expr));}catch{expr="Err";}update();return;}
    expr+=k;update();
  };
  keys.appendChild(b);
});

document.addEventListener("keydown", e => {
  if ("0123456789+-*/.".includes(e.key)) { expr += e.key; update(); }
  else if (e.key === "Enter") { try { expr = String(eval(expr)); } catch { expr = "Err"; } update(); }
  else if (e.key === "Backspace") { expr = expr.slice(0, -1); update(); }
  else if (e.key === "Escape") { expr = ""; update(); }
});

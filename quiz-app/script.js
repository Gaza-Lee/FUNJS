const qs=[
 {q:"What is 2+2?",a:["3","4","5"],c:1},
 {q:"Capital of France?",a:["London","Berlin","Paris"],c:2},
 {q:"JS stands for?",a:["JavaSource","JavaScript","JustScript"],c:1},
];
let i=0,score=0;
const quiz=document.getElementById("quiz");
function show(){
  if(i>=qs.length){quiz.innerHTML=`<h2>Score: ${score}/${qs.length}</h2><button onclick="location.reload()">Restart</button>`;return;}
  const q=qs[i];
  quiz.innerHTML=`<h2>${q.q}</h2>`+q.a.map((a,j)=>`<button onclick="ans(${j})">${a}</button>`).join("");
}
function ans(j){if(j===qs[i].c)score++;i++;show();}
show();

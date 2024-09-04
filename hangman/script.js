const words=["javascript","hangman","programming","developer","keyboard","browser","function","variable"];
const word=words[Math.floor(Math.random()*words.length)];
let guessed=Array(word.length).fill("_"),wrong=0,maxWrong=7;
const wordEl=document.getElementById("word");
const lettersEl=document.getElementById("letters");
const wrongEl=document.getElementById("wrong");
function render(){wordEl.textContent=guessed.join(" ");}
function makeButtons(){
  for(let i=0;i<26;i++){
    const ch=String.fromCharCode(97+i);
    const b=document.createElement("button");b.textContent=ch;
    b.onclick=()=>guess(ch,b);lettersEl.appendChild(b);
  }
}
function guess(ch,b){
  b.disabled=true;
  if(word.includes(ch)){word.split("").forEach((c,i)=>{if(c===ch)guessed[i]=ch;});}
  else{wrong++;wrongEl.textContent=wrong;}
  render();
  if(!guessed.includes("_"))alert("You win!");
  if(wrong>=maxWrong){alert("You lose! Word was "+word);guessed=word.split("");render();}
}
makeButtons();render();

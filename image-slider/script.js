let i=1;
const img=document.getElementById("img");
function show(){img.src="https://picsum.photos/800/400?random="+i;}
function next(){i++;if(i>5)i=1;show();}
function prev(){i--;if(i<1)i=5;show();}
